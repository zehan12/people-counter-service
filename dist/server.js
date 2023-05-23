"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var port = 4000;
app_1.default.listen(port, function () {
    console.log("\n        ################################################\n        \uD83D\uDE80 Server listening on port: ".concat(port, " \uD83D\uDE80\n        ################################################\n    "));
});
