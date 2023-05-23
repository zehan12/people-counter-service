import * as cv from "opencv4nodejs";
import * as fs from "fs";
import * as path from "path";
import * as fastcsv from "fast-csv";

declare module 'opencv4nodejs' {
    // Existing typings for readNetFromTensorflow
    function readNetFromTensorflow(modelFile: string, config?: string): any;
}  

// Pre-trained SSD model
const modelFile = path.join(__dirname, "./models/frozen_inference_graph.pb");
const config = path.join(__dirname, "./models/output.pbtxt");
const net = cv.readNetFromTensorflow(modelFile,config);

// Video stream
const videoStream = new cv.VideoCapture(3);
videoStream.set(cv.CAP_PROP_FRAME_WIDTH, 1280);
videoStream.set(cv.CAP_PROP_FRAME_HEIGHT, 720);

// object to store count and time
const data: { timestamp: string; peopleCount: number } = {
    timestamp: "",
    peopleCount: 0
};

// CSV file path
const csvFilePath = path.join(__dirname, "people_count.csv");

// Check if the CSV file exists
const isCsvFileExists = fs.existsSync(csvFilePath);

// Create a writable stream to the CSV file
const writableStream = fs.createWriteStream(csvFilePath, { flags: "a" });
const csvStream = fastcsv.format({ headers: !isCsvFileExists });
csvStream.pipe(writableStream);

// Check for people every 10 seconds
function runAnalytics() {
  setInterval(() => {
    const frame = videoStream.read();
    const frameResized = frame.resize(300, 300);
    net.setInput(
      cv.blobFromImage(
        frameResized,
        1.0,
        new cv.Size(300, 300),
        new cv.Vec3(127.5, 127.5, 127.5),
        true,
        false
      )
    );
    const output = net.forward();
    const numRows  = output.sizes.slice(2, 3);
    const row:number = numRows[0]

    let numPeople = 0;
    for (let y = 0; y < row; y += 1) {
      const confidence = output.at([0, 0, y, 2]);
      const classId = output.at([0, 0, y, 1]);

      // For class ID 1 (person)
      if (confidence > 0.5 && classId === 1) {
        numPeople++;
      }
    }

    // Write the people count to the log file along with a timestamp
    const timestamp = new Date().toISOString();

    data.timestamp = timestamp;
    data.peopleCount = numPeople;

    // Log the number of people detected
    console.log(`TimeStamp:${data.timestamp} Number of people detected: ${numPeople}`);

    csvStream.write(data);
  }, 10000); // 10000 milliseconds = 10 seconds
}

export {
    runAnalytics,
    data
};