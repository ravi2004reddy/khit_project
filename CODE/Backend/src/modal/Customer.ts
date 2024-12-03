import mongoose from "mongoose";



export interface ICustomer extends mongoose.Document {
    name: string;
    email: string;
    phone: string;
    address: string;
    password: string;
    profilePic: string;
    role: number;
    createdAt: Date;
    updatedAt: Date;
};




const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    password:{type:String,required:true},
    profilePic:{type:String},
    role:{type:Number,default:1},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


const Customer = mongoose.model<ICustomer>("Customer", CustomerSchema);

export default Customer;