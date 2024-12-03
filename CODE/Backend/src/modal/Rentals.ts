import mongoose from "mongoose";


export interface IRental extends mongoose.Document {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    password?: string;
    profilePic?: string;
    role?: number;
    status?:string;
    createdAt?: Date;
    updatedAt?: Date;
};



const RentalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password:{type:String,required:true},
    profilePic:{type:String},
    role:{type:Number,default:2},
    status:{type:String,default:"Inactive"},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});


let Rental = mongoose.model<IRental>("Rental", RentalSchema);

export default Rental;


