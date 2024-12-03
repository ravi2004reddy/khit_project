"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Rentals_1 = __importDefault(require("../modal/Rentals"));
const Apartment_1 = __importDefault(require("../modal/Apartment"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import { IApartment } from "../modal/Apartment";
const Rental_1 = __importDefault(require("../Validation/Rental"));
const Rental_2 = require("../Validation/Rental");
const Rental_3 = require("../Validation/Rental");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Rental_4 = require("../Validation/Rental");
const BookModal_1 = __importDefault(require("../modal/BookModal"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const stroage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = path_1.default.join(__dirname, "../uploads/rentals");
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const filter = (req, file, cb) => {
    const mimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only jpeg,jpg and png are allowed"));
    }
};
const upload = (0, multer_1.default)({
    storage: stroage,
    fileFilter: filter
});
// register a new apartment
router.post("/register", upload.single('profile'), (0, Rental_1.default)(Rental_2.Register), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, address, email, phone, password } = req.body;
        const profilePic = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        console.log(req.body);
        const checkRental = yield Rentals_1.default.findOne({ email });
        if (checkRental) {
            return res.status(400).json({
                success: false,
                message: ["Rental already exists"]
            });
        }
        const rental = yield Rentals_1.default.create({
            name,
            address,
            email,
            phone,
            password,
            profilePic
        });
        if (rental) {
            return res.status(201).json({
                success: true,
                message: ["Apartment registered successfully"],
                data: rental
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["Failed to register"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// login
router.post("/login", (0, Rental_1.default)(Rental_3.Login), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const rental = yield Rentals_1.default.findOne({ email });
        console.log(rental);
        if (rental) {
            if (rental.status === "Inactive") {
                return res.status(400).json({
                    success: false,
                    message: ["Account is inactive"]
                });
            }
            if (rental.password === password && rental.status === "active") {
                const token = jsonwebtoken_1.default.sign({ email: rental.email }, process.env.JWT_SECRET || "VDFJBIBGK2132345KJFWF432R4", { expiresIn: "1h" });
                res.cookie("rentaltoken", token, { httpOnly: true });
                return res.status(200).json({
                    success: true,
                    message: ["Login successful"],
                    data: rental,
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: ["Invalid password"]
                });
            }
        }
        return res.status(400).json({
            success: false,
            message: ["Invalid email"]
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// const token verify
const verifyToken = (req, res, next) => {
    const token = req.cookies.rentaltoken;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "VDFJBIBGK2132345KJFWF432R4", (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: ["Invalid token"]
                });
            }
            req.body.email = decoded.email;
            next();
        });
    }
    else {
        return res.status(400).json({
            success: false,
            message: ["Token not provided"]
        });
    }
};
// get the profile
router.get("/profile/:id", verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rental = yield Rentals_1.default.findById(req.params.id);
        if (rental) {
            return res.status(200).json({
                success: true,
                message: ["Rental found"],
                data: rental
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["Rental not found"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// update the profile
router.put("/updateprofile/:id", verifyToken, upload.single('profile'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const rental = yield Rentals_1.default.findById(req.params.id);
        if (rental) {
            const { name, address, email, phone, password } = req.body;
            const profilePic = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            const updatedRental = yield Rentals_1.default.findByIdAndUpdate(req.params.id, {
                name,
                address,
                email,
                phone,
                password,
                profilePic
            }, { new: true });
            return res.status(200).json({
                success: true,
                message: ["Rental updated successfully"],
                data: updatedRental
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["Rental not found"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// change password
router.put("/changepassword/:id", verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rental = yield Rentals_1.default.findById(req.params.id);
        if (rental) {
            const { oldPassword, newPassword } = req.body;
            if (rental.password === oldPassword) {
                const updatedRental = yield Rentals_1.default.findByIdAndUpdate(req.params.id, {
                    password: newPassword
                }, { new: true });
                return res.status(200).json({
                    success: true,
                    message: ["Password updated successfully"],
                    data: updatedRental
                });
            }
            else {
                return res.status(400).json({
                    success: false,
                    message: ["Invalid password"]
                });
            }
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["Rental not found"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// add a House 
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = path_1.default.join(__dirname, "../uploads/houses");
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const filter1 = (req, file, cb) => {
    const mimeTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (mimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only jpeg,jpg and png are allowed"));
    }
};
const upload1 = (0, multer_1.default)({
    storage: storage,
    fileFilter: filter1
});
router.post("/addhouse/:id", verifyToken, upload1.array('images', 5), (0, Rental_1.default)(Rental_4.AddHouse), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = req.params.id;
        const { title, price, location, type, facilities, description, bedrooms, bathrooms, squareFootage, availableFrom, parkingAvailable, petPolicy, heating, cooling, deposit, leaseTerm, nearbySchools, publicTransport, shoppingCenters, groceryStores, security, contact, website } = req.body;
        const images = (_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => {
            return file.filename;
        });
        const apartment = yield Apartment_1.default.create({
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
            rental: id,
            images
        });
        if (apartment) {
            return res.status(201).json({
                success: true,
                message: ["House added successfully"],
                data: apartment
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["Failed to add house"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// get all houses
router.get('/houses/:id', verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartments = yield Apartment_1.default.find({ rental: req.params.id });
        if (apartments) {
            return res.status(200).json({
                success: true,
                message: ["Houses found"],
                data: apartments
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["Houses not found"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// get a single house
router.get('/housedetail/:id', verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartment = yield Apartment_1.default.findById(req.params.id);
        if (apartment) {
            return res.status(200).json({
                success: true,
                message: ["House found"],
                data: apartment
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["House not found"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// update a house
router.put('/house/:id', verifyToken, upload1.array('images', 5), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const apartment = yield Apartment_1.default.findById(req.params.id);
        if (apartment) {
            const { title, price, location, type, facilities, description, bedrooms, bathrooms, squareFootage, availableFrom, parkingAvailable, petPolicy, heating, cooling, deposit, leaseTerm, nearbySchools, publicTransport, shoppingCenters, groceryStores, security, contact, website } = req.body;
            const images = (_a = req.files) === null || _a === void 0 ? void 0 : _a.map((file) => {
                return file.filename;
            });
            const updatedApartment = yield Apartment_1.default.findByIdAndUpdate(req.params.id, {
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
            }, { new: true });
            return res.status(200).json({
                success: true,
                message: ["House updated successfully"],
                data: updatedApartment
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["House not found"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// delete a house
router.delete('/deletehouse/:id', verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartment = yield Apartment_1.default.findById(req.params.id);
        if (apartment) {
            yield Apartment_1.default.findByIdAndDelete(req.params.id);
            return res.status(200).json({
                success: true,
                message: ["House deleted successfully"]
            });
        }
        else {
            return res.status(400).json({
                success: false,
                message: ["House not found"]
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// view booking
router.get('/booking/:id', verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const booking = yield BookModal_1.default.find({
            rental: id
        }).populate('apartment').populate('rental');
        if (booking.length > 0) {
            return res.status(200).json({ data: booking });
        }
        else {
            return res.status(404).json({ message: ["Booking not found"] });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// dashboard
router.get('/dashboard/:id', verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Total count of rentals and bookings
        const rental = yield Apartment_1.default.find({ rental: id }).countDocuments();
        const booking = yield BookModal_1.default.find({ rental: id }).countDocuments();
        // Month-wise aggregation for apartments
        const appartment = yield Apartment_1.default.aggregate([
            {
                '$match': {
                    'rental': new mongoose_1.default.Types.ObjectId(id)
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
        const bookingData = yield BookModal_1.default.aggregate([
            {
                '$match': {
                    'rental': new mongoose_1.default.Types.ObjectId(id)
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
router.delete('/logout', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('rentaltoken');
    return res.status(200).json({ message: ['Logout success'] });
}));
exports.default = router;
