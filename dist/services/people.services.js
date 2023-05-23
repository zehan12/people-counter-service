"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var opencv_1 = require("../opencv");
var getPeopleCount = function () {
    var peopleCount = opencv_1.data.peopleCount, timestamp = opencv_1.data.timestamp;
    if (peopleCount || peopleCount === 0) {
        return {
            "type": "success",
            "message": "Number of  people detected",
            "statusCode": 201,
            "count": peopleCount,
            "timestamp": timestamp
        };
    }
    else {
        return {
            "type": "error",
            "message": "unable to count people",
            "statusCode": 400,
            "count": null,
            "timestamp": null
        };
    }
};
var peopleService = {
    getPeopleCount: getPeopleCount
};
exports.default = peopleService;
