import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Rental from "../modal/Rentals";
import Customer from "../modal/Customer";
import Apartment from "../modal/Apartment";


dotenv.config();




const router = Router();



// login
router.post('/login',async(req:Request,res:any,next:NextFunction)=>{
    try{
        const { email,password } = req.body;
         if(email === 'admin@gmail.com' && password === 'admin'){
            const token = jwt.sign({email:email},process.env.JWT_SECRET || "VDFJBIBGK2132345KJFWF432R4",{expiresIn:'1h'});
            res.cookie('admintoken',token,{httpOnly:true});
            return res.status(200).json({message:['Login success'],token});
         }else{
                return res.status(400).json({errors:['Invalid credentials']});
         }


    }catch(error:any){
        res.status(500).json({errors:error.message});
    }
});


const verifyToken = (req:Request,res:any,next:NextFunction)=>{
    const token = req.cookies.admintoken;
    if(!token){
        return res.status(401).json({message:['Unauthorized']});
    }
    try {
        jwt.verify(token,process.env.JWT_SECRET as string,(err:any,decoded:any)=>{
            if(err){
                return res.status(401).json({errors:['Unauthorized']});
            }
            req.body.user = decoded;
            next();
        }
        );
        
    } catch (error) {
        return res.status(401).json({message:['Unauthorized']});
    }
};


// get the rentals
router.get('/rentals',verifyToken,async(req:Request,res:any)=>{
    try {
       const name = req.query.name as string;
       let rental;
         if(name){
              rental = await Rental.find({name:name});
            }else{
                rental = await Rental.find();
            }
         

        if(rental.length > 0){
            return res.status(200).json({data:rental});
        }else{
            return res.status(400).json({message:['No rental found']});
        }
    } catch (error:any) {
        res.status(500).json({errors:error.message});
    }
});


router.put('/rental/:id',verifyToken,async(req:Request,res:any)=>{
    try{
        const status = req.body.status;

        const rental = await Rental.findByIdAndUpdate(req.params.id,{status:status},{new:true});
        if(rental){
            return res.status(200).json({message:['Rental status updated'],data:rental});
        }else{
            return res.status(400).json({message:['Rental not found']});
        }

    }catch(error:any){
        res.status(500).json({message:["Internal server error"]});
    }
});


router.get('/customers',verifyToken,async(req:Request,res:any)=>{
    try {

        const customer = await Customer.find();
        if(customer.length > 0){
            return res.status(200).json({data:customer});
        }else{
            return res.status(400).json({message:['No customer found']});
        }
    } catch (error:any) {
        res.status(500).json({errors:error.message});
    }
});




router.get('/dashboard',async(req:Request,res:any)=>{
    try {
        const customer =  await Customer.find().countDocuments();
        const rental = await Rental.find().countDocuments();
        const appartment = await Apartment.find().countDocuments();

        const rentalmonthwise = await Rental.aggregate(
            [
                {
                  '$group': {
                    '_id': {
                      '$month': '$createdAt'
                    }, 
                    'count': {
                      '$sum': 1
                    }
                  }
                }
              ]
        );

        const appartmentMonthwise = await Apartment.aggregate(
            [
                {
                  '$group': {
                    '_id': {
                      '$month': '$createdAt'
                    }, 
                    'count': {
                      '$sum': 1
                    }
                  }
                }
              ]
        );


        const customerMonthwise = await Customer.aggregate(
            [
                {
                  '$group': {
                    '_id': {
                      '$month': '$createdAt'
                    }, 
                    'count': {
                      '$sum': 1
                    }
                  }
                }
              ]
        );



        return res.status(200).json({
            success:true,
            customer,
            rental,
            appartment,
            rentalmonthwise,
            appartmentMonthwise,
            customerMonthwise
        })








    } catch (error:any) {
        res.status(500).json({errors:error.message});
    }
});



// get the pending houses
router.get('/apartments',verifyToken,async(req:Request,res:any)=>{
    try {
        console.log('here');
        const apartment = await Apartment.find({adminstatus:'Pending'});
        console.log(apartment);
        if(apartment.length > 0){
            return res.status(200).json({data:apartment});
        }else{
            return res.status(400).json({message:['No apartment found']});
        }
    } catch (error:any) {
        res.status(500).json({errors:error.message});
    }
});



// update the apartment status
router.put('/apartment/:id',verifyToken,async(req:Request,res:any)=>{
    try{
        const status = req.body.status;

        const apartment = await Apartment.findByIdAndUpdate(req.params.id,{adminstatus:status},{new:true});
        if(apartment){
            return res.status(200).json({message:['Apartment status updated'],data:apartment});
        }else{
            return res.status(400).json({message:['Apartment not found']});
        }

    }catch(error:any){
        res.status(500).json({message:["Internal server error"]});
    }
});












router.post('/logout',verifyToken,async(req:Request,res:any)=>{
    try {
        res.clearCookie('admintoken');
        return res.status(200).json({message:['Logout success']});
    } catch (error:any) {
        res.status(500).json({errors:error.message});
    }
});


export default router;