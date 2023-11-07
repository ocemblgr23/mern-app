import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";

export const errorHandeler = (error:Error,req:Request,res:Response,next:NextFunction)=>{

  const statusCode = res.statusCode ? res.statusCode :500;
  res.status(statusCode).jsonp({
    message:error.message,
    stack:error.stack
  })
}