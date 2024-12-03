import mongoose, { Document } from "mongoose";

// Define the IApartment interface extending mongoose.Document
export interface IApartment extends Document {
    title: string;
    price: number;
    location: string;
    type: string;
    facilities: string[];
    images: string[];
    description: string;
    bedrooms: number;
    bathrooms: number;
    squareFootage: number;
    availableFrom: Date;
    parkingAvailable: string;
    petPolicy: string;
    heating: string;
    cooling: string;
    deposit: number;
    leaseTerm: string;
    nearbySchools: string;
    publicTransport: string;
    shoppingCenters: string;
    groceryStores: string;
    security: string;
    contact: string;
    website: string;
    rental: mongoose.Schema.Types.ObjectId;
    status: string;
    createdAt: Date;
    adminstatus: string;
}

// Define the apartmentSchema
const apartmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    type: { type: String, required: true }, 
    facilities: [{ type: String }], 
    images: [{ type: String}], 
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
    website: { type: String,  }, // URL validation for the website
    rental: { type: mongoose.Schema.Types.ObjectId, ref: 'Rental', required: true }, // Reference to Rental
    status: { type: String, default: 'Available' }, // Status of the apartment
    createdAt: { type: Date, default: Date.now }, // Creation date
    adminstatus: { type: String, default: 'Pending' } // Admin status
});


const Apartment = mongoose.model<IApartment>('Apartment', apartmentSchema);

export default Apartment;
