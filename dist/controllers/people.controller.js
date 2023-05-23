"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPeopleAnalytics = void 0;
var people_services_1 = __importDefault(require("../services/people.services"));
/**
 * @desc      Get People Annlytics
 * @param     { Object } _req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } .......
 * @returns   { JSON } - A JSON object representing the type, message, status and count
 */
var getPeopleAnalytics = function (_req, res) {
    var _a = people_services_1.default.getPeopleCount(), type = _a.type, message = _a.message, statusCode = _a.statusCode, count = _a.count, timestamp = _a.timestamp;
    console.log(process.env.PORT);
    if (type === 'error') {
        return res.status(statusCode).json({
            type: type,
            message: message,
            timestamp: timestamp
        });
    }
    return res.status(statusCode).json({
        type: type,
        message: message + ": " + count,
        count: count,
        timestamp: timestamp
    });
};
exports.getPeopleAnalytics = getPeopleAnalytics;
