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
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const Rental_1 = __importDefault(require("./Controller/Rental"));
const Customer_1 = __importDefault(require("./Controller/Customer"));
const Admin_1 = __importDefault(require("./Controller/Admin"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use((0, body_parser_1.urlencoded)({ extended: true }));
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
app.use((0, cookie_parser_1.default)());
const server = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const db = yield mongoose_1.default.connect('mongodb://localhost:27017/house');
        if (db) {
            console.log('Database connected');
            app.listen(process.env.PORT || 5000, () => {
                console.log(`Server is running on port ${process.env.PORT || 5000}`);
            });
        }
        else {
            console.log('Database not connected');
        }
    }
    catch (error) {
        console.log('Error in server:', error);
        process.exit(1);
    }
});
app.get('/h', (req, res) => {
    res.send('Hello World');
});
app.use('/api/rental', Rental_1.default);
app.use('/api/customer', Customer_1.default);
app.use('/api/admin', Admin_1.default);
server();
