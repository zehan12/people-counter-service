"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var people_controller_1 = require("../controllers/people.controller");
var peopleRouter = (0, express_1.Router)();
// @route     GET api/people/analytics
// @desc      get count data
// @access    Public
peopleRouter.get("/analytics", people_controller_1.getPeopleAnalytics);
exports.default = peopleRouter;
