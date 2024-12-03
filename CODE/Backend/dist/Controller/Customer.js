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
const Customer_1 = __importDefault(require("../modal/Customer"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const Customer_2 = __importDefault(require("../Validation/Customer"));
const Customer_3 = require("../Validation/Customer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Apartment_1 = __importDefault(require("../modal/Apartment"));
const BookModal_1 = __importDefault(require("../modal/BookModal"));
const router = (0, express_1.Router)();
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        const dir = path_1.default.join(__dirname, '../uploads/customer');
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        else {
            cb(null, dir);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname));
    }
});
const filter = (req, file, cb) => {
    const mimetype = ['image/png', 'image/jpg', 'image/jpeg'];
    if (mimetype.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Only image is allowed'));
    }
};
const upload = (0, multer_1.default)({ storage: storage, fileFilter: filter });
router.post('/register', upload.single('profile'), (0, Customer_2.default)(Customer_3.Register), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, address, email, phone, password } = req.body;
    const profile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    console.log(req.body);
    try {
        const checkUser = yield Customer_1.default.findOne({ email });
        if (checkUser) {
            return res.status(400).json({ message: ['User already exist'] });
        }
        const newCustomer = yield Customer_1.default.create({ name, address, email, phone, password, profilePic: profile });
        if (newCustomer) {
            return res.status(201).json({ message: ['Customer created successfully'] });
        }
        else {
            return res.status(400).json({ message: ['Customer not created'] });
        }
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
router.post('/login', (0, Customer_2.default)(Customer_3.Login), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const customer = yield Customer_1.default.findOne({ email });
        if (!customer) {
            return res.status(400).json({ message: ['Invalid credentials'] });
        }
        else {
            if (customer.password !== password) {
                return res.status(400).json({ message: ['Invalid credentials'] });
            }
            else {
                const token = jsonwebtoken_1.default.sign({ email: customer.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.cookie('customertoken', token, { httpOnly: true });
                return res.status(200).json({ message: ['Login success'], data: customer, token });
            }
        }
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
// authentication middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies.customertoken;
    if (!token) {
        return res.status(401).json({ message: ['Unauthorized'] });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: ['Unauthorized'] });
            }
            req.body.user = decoded;
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ message: ['Unauthorized'] });
    }
};
// get the profile
router.get('/profile/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield Customer_1.default.findById(req.params.id);
        if (customer) {
            return res.status(200).json({ customer: customer });
        }
        else {
            return res.status(404).json({ message: ['Customer not found'] });
        }
    }
    catch (error) {
        return res.status(401).json({ message: ['internal server error'] });
    }
}));
// update the profile
router.put('/updateprofile/:id', verifyToken, upload.single('profile'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, address, email, phone, password } = req.body;
    const profile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
    try {
        const customer = yield Customer_1.default.findById(req.params.id);
        if (customer) {
            const updatedCustomer = yield Customer_1.default.findByIdAndUpdate(req.params.id, { name, address, email, phone, password, profile }, { new: true });
            return res.status(200).json({ customer: updatedCustomer });
        }
        else {
            return res.status(404).json({ message: ['Customer not found'] });
        }
    }
    catch (error) {
        return res.status(401).json({ message: ['Unauthorized'] });
    }
}));
// get the all house based on customer
router.get('/viewhouse', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city, startprice, endprice, bedrooms, facilities } = req.query;
        let query = {};
        if (city || startprice || endprice || bedrooms || facilities) {
            if (city) {
                query.location = city;
            }
            if (startprice && endprice) {
                query.price = { $gte: startprice, $lte: endprice };
            }
            if (bedrooms) {
                query.bedrooms = bedrooms;
            }
            if (facilities) {
                query.facilities = { $in: facilities };
            }
        }
        if (query) {
            const apartments = yield Apartment_1.default.aggregate([
                {
                    $match: query
                }, {
                    $match: {
                        adminstatus: 'Approved'
                    }
                }
            ]);
            return res.status(200).json({ data: apartments });
        }
        else {
            const apartments = yield Apartment_1.default.find({ adminstatus: 'Approved' });
            return res.status(200).json({ data: apartments });
        }
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
router.get('/housesss', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city, startprice, endprice, bedrooms, facilities } = req.query;
        // Initialize query object
        let query = {};
        // Add conditions to the query based on the provided parameters
        if (city) {
            query.location = city;
        }
        if (startprice && endprice) {
            query.price = { $gte: parseFloat(startprice), $lte: parseFloat(endprice) };
        }
        if (bedrooms) {
            query.bedrooms = parseInt(bedrooms);
        }
        if (facilities) {
            query.facilities = { $in: facilities.split(',') }; // Assumes facilities are comma-separated
        }
        // If query object has conditions, perform aggregation; otherwise return all apartments
        const apartments = Object.keys(query).length
            ? yield Apartment_1.default.aggregate([{ $match: query }, { $match: { adminstatus: 'Approved' } }])
            : yield Apartment_1.default.find({ adminstatus: 'Approved' });
        // Send the response with the apartments data
        return res.status(200).json({ data: apartments });
    }
    catch (error) {
        // Handle errors and send error message
        return res.status(500).json({ message: error.message });
    }
}));
router.get('/gethouse', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartments = yield Apartment_1.default.find({ adminstatus: 'Approved' });
        if (apartments) {
            return res.status(200).json({ data: apartments });
        }
        return res.status(404).json({ message: ['House not found'] });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
// router get the house based on id
router.get('/viewhousedetails/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const apartment = yield Apartment_1.default.findById(req.params.id);
        if (apartment) {
            return res.status(200).json({ data: apartment });
        }
        return res.status(404).json({ message: ['House not found'] });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}));
// router book the house
router.post('/bookhouse/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { cardholder, cardnumber, expiry, cvv, apartment, rental, customerName, email, phone } = req.body;
        const user = yield Customer_1.default.findById(id);
        if (!user) {
            return res.status(404).json({ message: ["Customer not found"] });
        }
        else {
            const house = yield Apartment_1.default.findById(apartment);
            // console.log(house);
            if (!house) {
                return res.status(404).json({ message: ["House not found"] });
            }
            console.log(req.body);
            const NewBooking = yield BookModal_1.default.create({
                customer: id,
                apartment,
                rental,
                customerName: customerName,
                email: email,
                phone: phone,
                cardholder,
                cardnumber,
                expiry, cvv
            });
            console.log(NewBooking);
            if (NewBooking) {
                yield Apartment_1.default.findByIdAndUpdate(apartment, { status: 'booked' });
                return res.status(201).json({ message: ["House booked successfully"] });
            }
            else {
                return res.status(400).json({ message: ["House not booked"] });
            }
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
// get the booking details
router.get('/viewbooking/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const booking = yield BookModal_1.default.find({ customer: id }).populate('apartment').populate('rental');
        if (booking) {
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
// change password
router.put('/changepassword/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const { oldpassword, newpassword } = req.body;
        const customer = yield Customer_1.default.findById(id);
        console.log(customer === null || customer === void 0 ? void 0 : customer.password, "customer");
        console.log(oldpassword, "oldpassword");
        if (customer) {
            if (customer.password === oldpassword) {
                yield Customer_1.default.findByIdAndUpdate(id, { password: newpassword });
                return res.status(200).json({ message: ["Password changed successfully"] });
            }
            else {
                return res.status(400).json({ message: ["Old password is incorrect"] });
            }
        }
        else {
            return res.status(404).json({ message: ["Customer not found"] });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: ["Internal server error"]
        });
    }
}));
router.delete('/logout', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('customertoken');
    return res.status(200).json({ message: ['Logout success'] });
}));
exports.default = router;
