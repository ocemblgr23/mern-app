import { NextFunction } from 'express';
import { Router, Request, Response } from 'express';
import { IWorker, Worker } from '../models/worker-model';
import * as HTTP_STATUS_CODES from "http-status"

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
    res.status(HTTP_STATUS_CODES.CREATED).jsonp({ newWorkerProfile });
  } catch (error) {
    next(error)
    // console.log('Error in saving worker to the database');
  }
});

router.get('/', async (req: Request, res: Response) => {
  const workers = await Worker.find({});
  res.status(HTTP_STATUS_CODES.OK).jsonp(workers);
});

router.get('/:id', async (req: Request, res: Response,next:NextFunction) => {
  let id = req.params.id;
  try {
    const worker = await Worker.findById({_id:id});
    if(!worker) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).jsonp({
        message:`${id} : Didn't Match Any Worker.`
      })
      return;
    }
    res.status(HTTP_STATUS_CODES.OK).jsonp(worker);
  } catch (error) {
    next(error)
  }

});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const worker = await Worker.findById({_id:id});
    if(!worker) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).jsonp({
        message:`${id} : Didn't Match Any Worker.`
      })
      return;
    }
    const updatedWorker = await Worker.updateOne(req.body);
    res.status(HTTP_STATUS_CODES.OK).jsonp(updatedWorker);
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  try {
    const worker = await Worker.findById({_id:id});
    if(!worker) {
      res.status(HTTP_STATUS_CODES.NOT_FOUND).jsonp({
        message:`${id} : Didn't Match Any Worker.`
      })
      return;
    }
    const deleteWorker = await Worker.deleteOne({_id:id});
    res.status(HTTP_STATUS_CODES.OK).jsonp(deleteWorker);
  } catch (error) {
    next(error)
  }
});

export default router;
