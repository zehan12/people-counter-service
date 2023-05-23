import { RequestHandler, Request, Response } from "express";
import peopleService from "../services/people.services";


/**
 * @desc      Get People Annlytics
 * @param     { Object } _req - Request object
 * @param     { Object } res - Response object
 * @property  { Object } .......
 * @returns   { JSON } - A JSON object representing the type, message, status and count
 */
export const getPeopleAnalytics:RequestHandler  =  ( _req:Request, res:Response ) => {
  const { type, message, statusCode, count, timestamp } = peopleService.getPeopleCount();
  if (type === 'error') {
    return res.status(statusCode).json({
      type,
      message:message,
      timestamp
    });
  }

  return res.status(statusCode).json({
    type,
    message: message+": "+count,
    count,
    timestamp
  });

};
