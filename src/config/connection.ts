import mongoose from "mongoose";
import * as uuid from "uuid"
export const run = async () =>{
  try {
      // @ts-ignore
      await  mongoose.connect(process.env.MONGOVRENT,{
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log("Connected to Remote DB")
      console.log(uuid.v4())
  } catch (e) {
      console.log(e)
  }

}