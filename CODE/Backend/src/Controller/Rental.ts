import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import Rental from "../modal/Rentals";
import Apartment  from "../modal/Apartment";
import multer from "multer";
import path from "path";
import fs from "fs";
import { IRental } from "../modal/Rentals";
// import { IApartment } from "../modal/Apartment";
import validate from "../Validation/Rental";
import { Register } from "../Validation/Rental";
import { Login } from "../Validation/Rental";
import  Jwt  from "jsonwebtoken";
import dotenv from "dotenv";
import {AddHouse} from "../Validation/Rental";
import Book from "../modal/BookModal";
import mongoose from "mongoose";


dotenv.config();





const router = Router();



const stroage = multer.diskStorage({
    destination:(req:Request,file:Express.Multer.File,cb:Function)=>{
        const dir = path.join(__dirname,"../uploads/rentals");
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
        }
        cb(null,dir);
    },
    filename:(req:Request,file:Express.Multer.File,cb:Function)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
});



const filter = (req:Request,file:Express.Multer.File,cb:Function)=>{
    const mimeTypes = ["image/jpeg","image/png","image/jpg"];
    if(mimeTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only jpeg,jpg and png are allowed"));
    }
}


const upload = multer({
    storage:stroage,
    fileFilter:filter
});



// register a new apartment
router.post("/register",upload.single('profile'),validate(Register),async(req:Request,res:any,next:NextFunction)=>{
    try{
        const {name,address,email,phone,password} :IRental = req.body;
        const profilePic = req.file?.filename;

        console.log(req.body);

        const checkRental = await Rental.findOne({email});
        if(checkRental){
            return res.status(400).json({
                success:false,
                message:["Rental already exists"]
            })
        }

        const rental = await Rental.create({
            name,
            address,
            email,
            phone,
            password,
            profilePic
        });

        if(rental){
            return res.status(201).json({
                success:true,
                message:["Apartment registered successfully"],
                data:rental
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["Failed to register"]
            })
        }
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});




// login
router.post("/login",validate(Login),async(req:Request,res:any,next:NextFunction)=>{
    try{
        const {email,password} = req.body;
        const rental = await Rental.findOne({email});
        console.log(rental);
        if(rental){
            if(rental.status === "Inactive"){
                return res.status(400).json({
                    success:false,
                    message:["Account is inactive"]
                })
            }
            if(rental.password === password && rental.status === "active"){
                const token = Jwt.sign({email:rental.email},process.env.JWT_SECRET || "VDFJBIBGK2132345KJFWF432R4",{expiresIn:"1h"});
                res.cookie("rentaltoken",token,{httpOnly:true});
                return res.status(200).json({
                    success:true,
                    message:["Login successful"],
                    data:rental,
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message:["Invalid password"]
                })
            }
        }
        return res.status(400).json({
            success:false,
            message:["Invalid email"]
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});




// const token verify
const verifyToken = (req:Request,res:any,next:NextFunction)=>{
    const token = req.cookies.rentaltoken;
    if(token){
        Jwt.verify(token,process.env.JWT_SECRET || "VDFJBIBGK2132345KJFWF432R4",(err:any,decoded:any)=>{
            if(err){
                return res.status(400).json({
                    success:false,
                    message:["Invalid token"]
                })
            }
            req.body.email = decoded.email;
            next();
        })
    }else{
        return res.status(400).json({
            success:false,
            message:["Token not provided"]
        })
    }
};


// get the profile
router.get("/profile/:id",verifyToken,async(req:Request,res:any,next:NextFunction)=>{
    try{
        const rental = await Rental.findById(req.params.id);
        if(rental){
            return res.status(200).json({
                success:true,
                message:["Rental found"],
                data:rental
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["Rental not found"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});



// update the profile
router.put("/updateprofile/:id",verifyToken,upload.single('profile'),async(req:Request,res:any,next:NextFunction)=>{
    try{
        const rental = await Rental.findById(req.params.id);
        if(rental){
            const {name,address,email,phone,password} = req.body;
            const profilePic = req.file?.filename;
            const updatedRental = await Rental.findByIdAndUpdate(req.params.id,{
                name,
                address,
                email,
                phone,
                password,
                profilePic
            },{new:true});
            return res.status(200).json({
                success:true,
                message:["Rental updated successfully"],
                data:updatedRental
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["Rental not found"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});





// change password
router.put("/changepassword/:id",verifyToken,async(req:Request,res:any,next:NextFunction)=>{
    try{
        const rental = await Rental.findById(req.params.id);
        if(rental){
            const {oldPassword,newPassword} = req.body;
            if(rental.password === oldPassword){
                const updatedRental = await Rental.findByIdAndUpdate(req.params.id,{
                    password:newPassword
                },{new:true});
                return res.status(200).json({
                    success:true,
                    message:["Password updated successfully"],
                    data:updatedRental
                })
            }else{
                return res.status(400).json({
                    success:false,
                    message:["Invalid password"]
                })
            }
        }else{
            return res.status(400).json({
                success:false,
                message:["Rental not found"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});




// add a House 
const storage = multer.diskStorage({
    destination:(req:Request,file:Express.Multer.File,cb:Function)=>{
        const dir = path.join(__dirname,"../uploads/houses");
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir,{recursive:true});
        }
        cb(null,dir);
    },
    filename:(req:Request,file:Express.Multer.File,cb:Function)=>{
        cb(null,Date.now() + path.extname(file.originalname));
    }
});


const filter1 = (req:Request,file:Express.Multer.File,cb:Function)=>{
    const mimeTypes = ["image/jpeg","image/png","image/jpg"];
    if(mimeTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only jpeg,jpg and png are allowed"));
    }
}


const upload1 = multer({
    storage:storage,
    fileFilter:filter1
});


router.post("/addhouse/:id",verifyToken,upload1.array('images',5),validate(AddHouse),async(req:Request,res:any,next:NextFunction)=>{
    try{

        const id :string = req.params.id as string;
        
        const {title,price,location,type,facilities,description,bedrooms,bathrooms,squareFootage,availableFrom,parkingAvailable,petPolicy,heating,cooling,deposit,leaseTerm,nearbySchools,publicTransport,shoppingCenters,groceryStores,security,contact,website} = req.body;
        const images = (req.files as Express.Multer.File[])?.map((file: Express.Multer.File) => {
            return file.filename;
        });

        const apartment = await Apartment.create({
            title,
            price,
            location,
            type,
            facilities,
            description,
            bedrooms,
            bathrooms,
            squareFootage,
            availableFrom,
            parkingAvailable,
            petPolicy,
            heating,
            cooling,
            deposit,
            leaseTerm,
            nearbySchools,
            publicTransport,
            shoppingCenters,
            groceryStores,
            security,
            contact,
            website,
            rental:id,
            images
        });

        if(apartment){
            return res.status(201).json({
                success:true,
                message:["House added successfully"],
                data:apartment
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["Failed to add house"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});



// get all houses
router.get('/houses/:id',verifyToken,async(req:Request,res:any,next:NextFunction)=>{
    try{
        const apartments = await Apartment.find({rental:req.params.id});
        if(apartments){
            return res.status(200).json({
                success:true,
                message:["Houses found"],
                data:apartments
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["Houses not found"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});



// get a single house
router.get('/housedetail/:id',verifyToken,async(req:Request,res:any,next:NextFunction)=>{
    try{
        const apartment = await Apartment.findById(req.params.id);
        if(apartment){
            return res.status(200).json({
                success:true,
                message:["House found"],
                data:apartment
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["House not found"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});



// update a house
router.put('/house/:id',verifyToken,upload1.array('images',5),async(req:Request,res:any,next:NextFunction)=>{
    try{
        const apartment = await Apartment.findById(req.params.id);
        if(apartment){
            const {title,price,location,type,facilities,description,bedrooms,bathrooms,squareFootage,availableFrom,parkingAvailable,petPolicy,heating,cooling,deposit,leaseTerm,nearbySchools,publicTransport,shoppingCenters,groceryStores,security,contact,website} = req.body;
            const images = (req.files as Express.Multer.File[])?.map((file: Express.Multer.File) => {
                return file.filename;
            });

            const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id,{
                title,
                price,
                location,
                type,
                facilities,
                description,
                bedrooms,
                bathrooms,
                squareFootage,
                availableFrom,
                parkingAvailable,
                petPolicy,
                heating,
                cooling,
                deposit,
                leaseTerm,
                nearbySchools,
                publicTransport,
                shoppingCenters,
                groceryStores,
                security,
                contact,
                website,
                images
            },{new:true});
            return res.status(200).json({
                success:true,
                message:["House updated successfully"],
                data:updatedApartment
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["House not found"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});



// delete a house
router.delete('/deletehouse/:id',verifyToken,async(req:Request,res:any,next:NextFunction)=>{
    try{
        const apartment = await Apartment.findById(req.params.id);
        if(apartment){
            await Apartment.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                success:true,
                message:["House deleted successfully"]
            })
        }else{
            return res.status(400).json({
                success:false,
                message:["House not found"]
            })
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:["Internal server error"]
        })
    }
});








// view booking
router.get('/booking/:id',verifyToken,async(req:Request,res:any,next:NextFunction)=>{
    try {
        const id:string = req.params.id as string;
       const booking = await Book.find({
        rental:id
       }).populate('apartment').populate('rental');
        if(booking.length > 0){
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




// dashboard
router.get('/dashboard/:id', verifyToken, async (req: Request, res: any, next: NextFunction) => {
    try {
        const id: string = req.params.id as string;

        // Total count of rentals and bookings
        const rental = await Apartment.find({ rental: id }).countDocuments();
        const booking = await Book.find({ rental: id }).countDocuments();

        // Month-wise aggregation for apartments
        const appartment = await Apartment.aggregate([
            {
              '$match': {
                'rental': new mongoose.Types.ObjectId(id)
              }
            }, {
              '$group': {
                '_id': {
                  '$month': '$createdAt'
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }
          ]);

        // Month-wise aggregation for bookings
        const bookingData = await Book.aggregate([
            {
              '$match': {
                'rental': new mongoose.Types.ObjectId(id)
              }
            }, {
              '$group': {
                '_id': {
                  '$month': '$createdAt'
                }, 
                'count': {
                  '$sum': 1
                }
              }
            }
          ]);

        // Sending response
        return res.status(200).json({
            success: true,
            data: {
                totalRentals: rental, 
                totalBookings: booking, 
                monthWiseRentals: appartment, 
                monthWiseBookings: bookingData 
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
});



router.delete('/logout',verifyToken,async(req:Request,res:any)=>{
    res.clearCookie('rentaltoken');
    return res.status(200).json({message:['Logout success']});
})








export default router;







