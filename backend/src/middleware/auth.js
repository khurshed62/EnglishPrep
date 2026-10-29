"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
exports.optionalAuthMiddleware = optionalAuthMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Access token is missing or malformed',
        });
        return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = (0, jwt_1.verifyAccessToken)(token);
    if (!decoded) {
        res.status(401).json({
            error: 'Unauthorized',
            message: 'Invalid or expired access token',
        });
        return;
    }
    req.user = decoded;
    next();
}
function optionalAuthMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwt_1.verifyAccessToken)(token);
        if (decoded) {
            req.user = decoded;
        }
    }
    next();
}
