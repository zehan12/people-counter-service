"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var people_1 = __importDefault(require("./routes/people"));
var opencv_1 = require("./opencv");
var app = (0, express_1.default)();
(0, opencv_1.runAnalytics)();
app.use("/api/people", people_1.default);
app.get("/", function (req, res) {
    res.end("backend");
});
exports.default = app;
