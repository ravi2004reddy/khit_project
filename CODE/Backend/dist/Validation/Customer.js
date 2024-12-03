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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Update = exports.Login = exports.Register = void 0;
const express_validator_1 = require("express-validator");
exports.Register = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('address').notEmpty().withMessage('Address is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is required'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
    (0, express_validator_1.body)('profile').custom((value, { req }) => {
        if (!req.file) {
            throw new Error('Profile is required');
        }
        return true;
    }),
];
exports.Login = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Email is required'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('Password is required'),
];
exports.Update = [
    // all are optional
    (0, express_validator_1.body)('name').optional(),
    (0, express_validator_1.body)('address').optional(),
    (0, express_validator_1.body)('email').optional(),
    (0, express_validator_1.body)('phone').optional(),
    (0, express_validator_1.body)('password').optional(),
    (0, express_validator_1.body)('profile').optional(),
];
const validate = (validations) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        for (let validation of validations) {
            const result = yield validation.run(req);
        }
        const errors = (0, express_validator_1.validationResult)(req);
        let messages;
        if (errors.isEmpty()) {
            return next();
        }
        else {
            // loop the message
            for (let i = 0; i < errors.array().length; i++) {
                messages = errors.array()[i].msg;
            }
            return res.status(400).json({ message: messages });
        }
    });
};
exports.default = validate;
