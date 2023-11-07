import { Model, ObjectId, Schema, model } from "mongoose";

export interface ICourse {
  _id?:ObjectId;
  course:string;
  duration?:number; // optional parameter
  description:string;
  thumbnail:string;
  rating:string;
}

const courseSchema = new Schema<ICourse>({
  course:{type:String},
  duration:{type:String},
  description:{type:String},
  thumbnail:{type:String},
  rating:{type:String},
})


// Create Course Model
export const Course = model<ICourse>("Course",courseSchema)