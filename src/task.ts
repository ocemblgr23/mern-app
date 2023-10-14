import { Router, Request, Response } from 'express';
import { Task } from './models/task';

const router = Router();
let tasks: Task[] = [];


// Add your CRUD API implementation here

router.post("/",(req:Request,res:Response)=>{
    const {title,description} = req.body
    const task:Task = {
        id:tasks.length +1,
        title,
        description,
        completed:false
    }

    tasks.push(task);
    res.status(201).jsonp(task)
})

router.get("/",(req:Request,res:Response)=>{
    res.status(200).jsonp(tasks);
})

export default router;