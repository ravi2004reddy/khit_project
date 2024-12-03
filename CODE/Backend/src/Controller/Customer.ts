import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import Customer from "../modal/Customer";
import { ICustomer } from "../modal/Customer";
import multer from "multer";
import path from "path";
import fs from "fs";
import validate from "../Validation/Customer";
import { Register , Login } from "../Validation/Customer";
import jwt from "jsonwebtoken";
import Apartment from "../modal/Apartment";
import Book from "../modal/BookModal";
import { IBook } from "../modal/BookModal";


const router = Router();

const storage = multer.diskStorage({  
    destination:(req:Request,file:Express.Multer.File,cb:Function)=>{
        const dir = path.join(__dirname,'../uploads/customer');
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
        }else{
            cb(null,dir);
        }
    },
    filename:(req:Request,file:Express.Multer.File,cb:Function)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }

});


const filter = (req:Request,file:Express.Multer.File,cb:Function)=>{
    const mimetype = ['image/png','image/jpg','image/jpeg'];
    if(mimetype.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only image is allowed'));
    }
};


const upload = multer({storage:storage,fileFilter:filter});



router.post('/register',upload.single('profile'),validate(Register),async(req:Request,res:any)=>{
    const { name,address,email,phone,password } = req.body;
    const profile = req.file?.filename;

    console.log(req.body);
    
    try {
    const checkUser = await Customer.findOne({email})
    if(checkUser){
        return res.status(400).json({message:['User already exist']});
    }
    const newCustomer = await Customer.create({name,address,email,phone,password,profilePic:profile});

    if(newCustomer){
        return res.status(201).json({message:['Customer created successfully']});
    }else{
        return res.status(400).json({message:['Customer not created']});
    }
       
    } catch (error:any) {
        res.status(500).json({errors:error.message});
    }
});



router.post('/login',validate(Login),async(req:Request,res:any)=>{
    const { email,password } = req.body;
    try {
        const customer = await Customer.findOne({email});
        if(!customer){
            return res.status(400).json({message:['Invalid credentials']});
        }else{
            if(customer.password !== password){
                return res.status(400).json({message:['Invalid credentials']});
            }else{
                const token = jwt.sign({email:customer.email},process.env.JWT_SECRET as string,{expiresIn:'1h'});
                res.cookie('customertoken',token,{httpOnly:true});
                return res.status(200).json({message:['Login success'],data:customer,token});
            }
        }
    }catch(error:any){
        res.status(500).json({errors:error.message});
    }
});



// authentication middleware
const verifyToken = (req:Request,res:any,next:NextFunction)=>{
    const token = req.cookies.customertoken;
    if(!token){
        return res.status(401).json({message:['Unauthorized']});
    }
    try {
        jwt.verify(token,process.env.JWT_SECRET as string,(err:any,decoded:any)=>{
            if(err){
                return res.status(401).json({message:['Unauthorized']});
            }
            req.body.user = decoded;
            next();
        }
        );
        
    } catch (error) {
        return res.status(401).json({message:['Unauthorized']});
    }
};




// get the profile
router.get('/profile/:id',verifyToken,async(req:Request,res:any)=>{
  
    try {
        const customer = await Customer.findById(req.params.id);
        if(customer){
            return res.status(200).json({customer:customer});
        }else{
            return res.status(404).json({message:['Customer not found']});
        }
       
    } catch (error) {
        return res.status(401).json({ message: ['internal server error'] });
    }
});




// update the profile
router.put('/updateprofile/:id',verifyToken,upload.single('profile'),async(req:Request,res:any)=>{
    const { name,address,email,phone,password } = req.body;
    const profile = req.file?.filename;
    try {
        const customer = await Customer.findById(req.params.id);
        if(customer){
            const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id,{name,address,email,phone,password,profile},{new:true});
            return res.status(200).json({customer:updatedCustomer});
        }else{
            return res.status(404).json({message:['Customer not found']});
        }
       
    } catch (error) {
        return res.status(401).json({ message: ['Unauthorized'] });
    }
});




// get the all house based on customer
router.get('/viewhouse',async(req:Request,res:any)=>{
    try{
        const {city , startprice , endprice , bedrooms,facilities} = req.query;

        let query:any = {};
        if(city || startprice || endprice || bedrooms || facilities){
            if(city){
                query.location = city;
            }
            if(startprice && endprice){
                query.price = { $gte:startprice , $lte:endprice };
            }
            if(bedrooms){
                query.bedrooms = bedrooms;
            }
            if(facilities){
                query.facilities = { $in:facilities };
            }
        }

        if(query){
            const apartments = await Apartment.aggregate([
                 {
                    $match:query
                    },{
                        $match:{
                            adminstatus:'Approved'
                        }
                    }
                    ]);
            return res.status(200).json({data:apartments});
        }else{
            const apartments = await Apartment.find({adminstatus:'Approved'});
            return res.status(200).json({data:apartments});
        }

    }catch(error:any){
        res.status(500).json({errors:error.message});
    }
    
    
});


router.get('/housesss',async (req: Request, res: any) => {
    try {
      const { city, startprice, endprice, bedrooms, facilities } = req.query;
  
      // Initialize query object
      let query: any = {};
  
      // Add conditions to the query based on the provided parameters
      if (city) {
        query.location = city;
      }
      if (startprice && endprice) {
        query.price = { $gte: parseFloat(startprice as string), $lte: parseFloat(endprice as string) };
      }
      if (bedrooms) {
        query.bedrooms = parseInt(bedrooms as string);
      }
      if (facilities) {
        query.facilities = { $in: (facilities as string).split(',') }; // Assumes facilities are comma-separated
      }
  
      // If query object has conditions, perform aggregation; otherwise return all apartments
      const apartments = Object.keys(query).length
        ? await Apartment.aggregate([{ $match: query },{ $match: { adminstatus: 'Approved' } }])
        : await Apartment.find({ adminstatus: 'Approved' });
  
      // Send the response with the apartments data
      return res.status(200).json({ data: apartments });
  
    } catch (error: any) {
      // Handle errors and send error message
      return res.status(500).json({ message: error.message });
    }
  });



  router.get('/gethouse',async(req:Request,res:any)=>{
    try {
        const apartments = await Apartment.find({adminstatus:'Approved'});
        if(apartments){
            return res.status(200).json({data:apartments});
        }
        return res.status(404).json({message:['House not found']});
    }
    catch (error:any) {
        return res.status(500).json({message:error.message});
    }
}
);




// router get the house based on id
router.get('/viewhousedetails/:id',async(req:Request,res:any)=>{
    try {
        const apartment = await Apartment.findById(req.params.id);
        if(apartment){
            return res.status(200).json({data:apartment});
        }
        return res.status(404).json({message:['House not found']});
    } catch (error:any) {
        return res.status(500).json({message:error.message});
    }
});



// router book the house
router.post('/bookhouse/:id',verifyToken,async(req:Request,res:any)=>{
    try{
        const id:string = req.params.id as string;

        const {cardholder,cardnumber,expiry,cvv,apartment,rental,customerName,email,phone} = req.body;

      

        const user = await Customer.findById(id);

        if(!user){
            return res.status(404).json({message:["Customer not found"]});
        }else{
            const house = await Apartment.findById(apartment);
            // console.log(house);
            if(!house){
                return res.status(404).json({message:["House not found"]});
            }
              console.log(req.body);
            const NewBooking = await Book.create({
                customer:id,
                apartment,
                rental,
                customerName:customerName,
                email:email,
                phone:phone,
                cardholder,
                cardnumber,
                expiry,cvv});
            console.log(NewBooking);
            if(NewBooking){
                await Apartment.findByIdAndUpdate(apartment,{status:'booked'});
                return res.status(201).json({message:["House booked successfully"]});
            }else{
                return res.status(400).json({message:["House not booked"]});
            } 
        }
    }catch(error:any){
        res.status(500).json({
            success:false,
            message:["Internal server error"]
        });
    }
});




// get the booking details
router.get('/viewbooking/:id',verifyToken,async(req:Request,res:any)=>{
    try {
        const id:string = req.params.id as string;
        const booking = await Book.find({customer:id}).populate('apartment').populate('rental');
        if(booking){
            return res.status(200).json({data:booking});
        }else{
            return res.status(404).json({message:["Booking not found"]});
        }
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:["Internal server error"]
        });
    }
});





// change password
router.put('/changepassword/:id',verifyToken,async(req:Request,res:any)=>{
    try {
        const id:string = req.params.id as string;
        const { oldpassword,newpassword } = req.body;
        const customer = await Customer.findById(id);
        console.log(customer?.password,"customer");
        console.log(oldpassword,"oldpassword");
        if(customer){
            if(customer.password === oldpassword){
                await Customer.findByIdAndUpdate(id,{password:newpassword});
                return res.status(200).json({message:["Password changed successfully"]});
            }else{
                return res.status(400).json({message:["Old password is incorrect"]});
            }
        }else{
            return res.status(404).json({message:["Customer not found"]});
        }
    } catch (error:any) {
        res.status(500).json({
            success:false,
            message:["Internal server error"]
        });
    }
});



router.delete('/logout',async(req:Request,res:any)=>{
    res.clearCookie('customertoken');
    return res.status(200).json({message:['Logout success']});
});















export default router;


        