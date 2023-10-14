import express, { Request, Response } from 'express';
import taskRoute from "./task"
import cors from "cors";
import mongoose from "mongoose"
import dotenv from "dotenv"

const app = express();
const port = process.env.PORT || 3000;


dotenv.config();
app.use(express.json());
app.use(cors())

//Todo add tasks route
app.use("/tasks",taskRoute)
const run = async () =>{
    try {
        // @ts-ignore
        await  mongoose.connect(process.env.MONGOURL);
        console.log("Connected to Remote DB")
    } catch (e) {
        console.log(e)
    }

}

run();




app.get('/', (req: Request, res: Response) => {
    res.jsonp({message: 'Hello, TypeScript Express!'});
});

app.get('/health',(req:Request, res:Response)=>{
    res.status(200).jsonp({
        message:"Health Check done."
    })
})



app.listen(port,()=>{
    console.log(
        `Server running under http://localhost:${port}`
    )
})