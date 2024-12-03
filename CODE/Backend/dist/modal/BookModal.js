"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
;
const BookSchema = new mongoose_1.default.Schema({
    customer: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Customer', required: true },
    apartment: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Apartment', required: true },
    rental: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Rental', required: true },
    createdAt: { type: Date, default: Date.now },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    cardholder: { type: String, required: true },
    cardnumber: { type: String, required: true },
    expiry: { type: String, required: true },
    cvv: { type: String, required: true },
});
const Book = mongoose_1.default.model('Book', BookSchema);
exports.default = Book;
