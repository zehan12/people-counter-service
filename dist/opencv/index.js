"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = exports.runAnalytics = void 0;
var cv = __importStar(require("opencv4nodejs"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var fastcsv = __importStar(require("fast-csv"));
// Pre-trained SSD model
var modelFile = path.join(__dirname, "./models/frozen_inference_graph.pb");
var config = path.join(__dirname, "./models/output.pbtxt");
var net = cv.readNetFromTensorflow(modelFile, config);
// Video stream
var videoStream = new cv.VideoCapture(3);
videoStream.set(cv.CAP_PROP_FRAME_WIDTH, 1280);
videoStream.set(cv.CAP_PROP_FRAME_HEIGHT, 720);
// object to store count and time
var data = {
    timestamp: "",
    peopleCount: 0
};
exports.data = data;
// CSV file path
var csvFilePath = path.join(__dirname, "people_count.csv");
// Check if the CSV file exists
var isCsvFileExists = fs.existsSync(csvFilePath);
// Create a writable stream to the CSV file
var writableStream = fs.createWriteStream(csvFilePath, { flags: "a" });
var csvStream = fastcsv.format({ headers: !isCsvFileExists });
csvStream.pipe(writableStream);
// Check for people every 10 seconds
function runAnalytics() {
    setInterval(function () {
        var frame = videoStream.read();
        var frameResized = frame.resize(300, 300);
        net.setInput(cv.blobFromImage(frameResized, 1.0, new cv.Size(300, 300), new cv.Vec3(127.5, 127.5, 127.5), true, false));
        var output = net.forward();
        var numRows = output.sizes.slice(2, 3);
        var row = numRows[0];
        var numPeople = 0;
        for (var y = 0; y < row; y += 1) {
            var confidence = output.at([0, 0, y, 2]);
            var classId = output.at([0, 0, y, 1]);
            // For class ID 1 (person)
            if (confidence > 0.5 && classId === 1) {
                numPeople++;
            }
        }
        // Write the people count to the log file along with a timestamp
        var timestamp = new Date().toISOString();
        data.timestamp = timestamp;
        data.peopleCount = numPeople;
        // Log the number of people detected
        console.log("TimeStamp:".concat(data.timestamp, " Number of people detected: ").concat(numPeople));
        csvStream.write(data);
    }, 10000); // 10000 milliseconds = 10 seconds
}
exports.runAnalytics = runAnalytics;
