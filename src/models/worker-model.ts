import { Model, ObjectId, Schema, model } from "mongoose";

export interface IWorker {
  _id?:ObjectId;
  name:string;
  age?:number; // optional parameter
  work_category:string;
  address:string;
  mobile:string;
  profile?:string;
  work_slot?:string;
  open_source?:boolean;
}

const workerSchema = new Schema<IWorker>({
  name:{type:String},
  age:{type:Number},
  work_category:{type:String},
  address:{type:String},
  mobile:{type:String,unique : true },
  profile:{type:String,default:"User Avater"},
  work_slot:{type:String},
  open_source:{type:Boolean,default:true}
})


// Create Worker Model
export const Worker = model<IWorker>("Worker",workerSchema)