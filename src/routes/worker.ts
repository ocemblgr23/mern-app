import { NextFunction } from 'express';
import { Router, Request, Response } from 'express';
import { IWorker, Worker } from '../models/worker-model';

const router = Router();
// Add your CRUD API implementation here

router.get('/health', (req: Request, res: Response) => {
  res.status(200).jsonp({
    message: 'Worker API Tested',
  });
});

router.post('/', async (req: Request, res: Response,next:NextFunction) => {
  const { name, age, work_category, address, mobile, profile, work_slot } =
    req.body;
  const newWorker = new Worker({
    name,
    age,
    address,
    work_category,
    mobile,
    profile,
    work_slot,
  });
  try {
    //  Create into DB
    const newWorkerProfile = await newWorker.save();
    res.status(201).jsonp({ newWorkerProfile });
  } catch (error) {
    next(error)
    // console.log('Error in saving worker to the database');
  }
});

router.get('/', async (req: Request, res: Response) => {
  const workers = await Worker.find({});
  res.status(200).jsonp(workers);
});

export default router;
