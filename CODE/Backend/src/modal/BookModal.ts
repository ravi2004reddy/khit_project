import mongoose from "mongoose";




export interface IBook extends mongoose.Document {
    customer: mongoose.Schema.Types.ObjectId;
    apartment: mongoose.Schema.Types.ObjectId;
    rental:mongoose.Schema.Types.ObjectId;
    createdAt: Date;
    customerName:string;
    email:string;
    phone:string;
    cardholder:string;
    cardnumber:string;
    expiry:string;
    cvv:string;
};




const BookSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    apartment: { type: mongoose.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    rental: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true },
    createdAt: { type: Date, default: Date.now },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cardholder: { type: String, required: true },
    cardnumber: { type: String, required: true },
    expiry: { type: String, required: true },
    cvv: { type: String, required: true },
});



const Book = mongoose.model<IBook>('Book', BookSchema);

export default Book;