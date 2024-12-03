"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the apartmentSchema
const apartmentSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true },
    facilities: [{ type: String }],
    images: [{ type: String }],
    description: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    squareFootage: { type: Number, required: true },
    availableFrom: { type: Date, required: true },
    parkingAvailable: { type: String },
    petPolicy: { type: String },
    heating: { type: String },
    cooling: { type: String },
    deposit: { type: Number, required: true }, // Security deposit
    leaseTerm: { type: String, required: true }, // Lease term, e.g., '12 months'
    nearbySchools: { type: String }, // Information on nearby schools
    publicTransport: { type: String }, // Public transport options
    shoppingCenters: { type: String }, // Nearby shopping centers
    groceryStores: { type: String }, // Nearby grocery stores
    security: { type: String }, // Security details
    contact: { type: String, required: true }, // Contact info
    website: { type: String, }, // URL validation for the website
    rental: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Rental', required: true }, // Reference to Rental
    status: { type: String, default: 'Available' }, // Status of the apartment
    createdAt: { type: Date, default: Date.now }, // Creation date
    adminstatus: { type: String, default: 'Pending' } // Admin status
});
const Apartment = mongoose_1.default.model('Apartment', apartmentSchema);
exports.default = Apartment;
