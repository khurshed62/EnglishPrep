"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
exports.verifyAccessToken = verifyAccessToken;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'lingvoprep-secret-key-2024';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || `${JWT_SECRET}-refresh`;
const ACCESS_TOKEN_EXPIRY = '1h';
const REFRESH_TOKEN_EXPIRY = '7d';
function generateAccessToken(payload) {
    const options = {
        expiresIn: ACCESS_TOKEN_EXPIRY,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, options);
}
function generateRefreshToken(payload) {
    const options = {
        expiresIn: REFRESH_TOKEN_EXPIRY,
    };
    return jsonwebtoken_1.default.sign(payload, JWT_REFRESH_SECRET, options);
}
function verifyAccessToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
function verifyRefreshToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
