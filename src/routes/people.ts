import { Router } from "express";
import { getPeopleAnalytics } from "../controllers/people.controller";

const peopleRouter = Router();

// @route     GET api/people/analytics
// @desc      get count data
// @access    Public
peopleRouter.get("/analytics",getPeopleAnalytics);

export default peopleRouter;