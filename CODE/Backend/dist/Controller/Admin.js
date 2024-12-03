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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const Rentals_1 = __importDefault(require("../modal/Rentals"));
const Customer_1 = __importDefault(require("../modal/Customer"));
const Apartment_1 = __importDefault(require("../modal/Apartment"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
// login
router.post('/login', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (email === 'admin@gmail.com' && password === 'admin') {
            const token = jsonwebtoken_1.default.sign({ email: email }, process.env.JWT_SECRET || "VDFJBIBGK2132345KJFWF432R4", { expiresIn: '1h' });
            res.cookie('admintoken', token, { httpOnly: true });
            return res.status(200).json({ message: ['Login success'], token });
        }
        else {
            return res.status(400).json({ errors: ['Invalid credentials'] });
        }
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
const verifyToken = (req, res, next) => {
    const token = req.cookies.admintoken;
    if (!token) {
        return res.status(401).json({ message: ['Unauthorized'] });
    }
    try {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ errors: ['Unauthorized'] });
            }
            req.body.user = decoded;
            next();
        });
    }
    catch (error) {
        return res.status(401).json({ message: ['Unauthorized'] });
    }
};
// get the rentals
router.get('/rentals', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        let rental;
        if (name) {
            rental = yield Rentals_1.default.find({ name: name });
        }
        else {
            rental = yield Rentals_1.default.find();
        }
        if (rental.length > 0) {
            return res.status(200).json({ data: rental });
        }
        else {
            return res.status(400).json({ message: ['No rental found'] });
        }
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
router.put('/rental/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.body.status;
        const rental = yield Rentals_1.default.findByIdAndUpdate(req.params.id, { status: status }, { new: true });
        if (rental) {
            return res.status(200).json({ message: ['Rental status updated'], data: rental });
        }
        else {
            return res.status(400).json({ message: ['Rental not found'] });
        }
    }
    catch (error) {
        res.status(500).json({ message: ["Internal server error"] });
    }
}));
router.get('/customers', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield Customer_1.default.find();
        if (customer.length > 0) {
            return res.status(200).json({ data: customer });
        }
        else {
            return res.status(400).json({ message: ['No customer found'] });
        }
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
router.get('/dashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = yield Customer_1.default.find().countDocuments();
        const rental = yield Rentals_1.default.find().countDocuments();
        const appartment = yield Apartment_1.default.find().countDocuments();
        const rentalmonthwise = yield Rentals_1.default.aggregate([
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
        ]);
        const appartmentMonthwise = yield Apartment_1.default.aggregate([
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
        ]);
        const customerMonthwise = yield Customer_1.default.aggregate([
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
        ]);
        return res.status(200).json({
            success: true,
            customer,
            rental,
            appartment,
            rentalmonthwise,
            appartmentMonthwise,
            customerMonthwise
        });
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
// get the pending houses
router.get('/apartments', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('here');
        const apartment = yield Apartment_1.default.find({ adminstatus: 'Pending' });
        console.log(apartment);
        if (apartment.length > 0) {
            return res.status(200).json({ data: apartment });
        }
        else {
            return res.status(400).json({ message: ['No apartment found'] });
        }
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
// update the apartment status
router.put('/apartment/:id', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.body.status;
        const apartment = yield Apartment_1.default.findByIdAndUpdate(req.params.id, { adminstatus: status }, { new: true });
        if (apartment) {
            return res.status(200).json({ message: ['Apartment status updated'], data: apartment });
        }
        else {
            return res.status(400).json({ message: ['Apartment not found'] });
        }
    }
    catch (error) {
        res.status(500).json({ message: ["Internal server error"] });
    }
}));
router.post('/logout', verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie('admintoken');
        return res.status(200).json({ message: ['Logout success'] });
    }
    catch (error) {
        res.status(500).json({ errors: error.message });
    }
}));
exports.default = router;
