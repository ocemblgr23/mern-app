import express, { Request, Response } from 'express';
import taskRoute from "./task"

const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());


//Todo add tasks route
app.use("/tasks",taskRoute)

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript Express!');
});

app.get('/health',(req:Request, res:Response)=>{
    res.status(200).jsonp({
        message:"Health Check done."
    })
})



app.listen(port,()=>{
    console.log(
        `Server running under http://localhost${port}`
    )
})