import { NextFunction } from 'express';
import { Router, Request, Response } from 'express';
import http_status from "http-status";
import { Course, ICourse } from '../models/course-model';


const router = Router();


// TODO: Better Comments
// TODO: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

/**
 *
 * *Create insert into DB
 */
router.post("/",async (req:Request,res:Response,next:NextFunction)=>{
  //Todo insert into DB
  // const {course,duration,description,thumbnail,rating}= req.body as ICourse;
  const {course,duration,description,thumbnail,rating}= req.body;
  const newCourse = new Course({
    course,
    duration,
    description,
    thumbnail,
    rating
  })
  try {

    const resp = await newCourse.save();
    res.status(http_status.CREATED).jsonp(resp);

  } catch (error) {
    next(error)
  }

})


/**
 *
 ** Get all from DB
 */
router.get("/",async (req:Request,res:Response,next:NextFunction)=>{
  // Todo get all from DB
  try {
    const courses = await Course.find({});
    res.status(http_status.OK).jsonp(courses);
  } catch (error) {
    next(error)
  }
})
/**
 *
 ** Get by ID
 * @id
 */
router.get("/:id",(req:Request,res:Response,next:NextFunction)=>{
  // Todo get by id
})

/**
 *
 * *Update by ID
 * @id
 * TODO: refactor this method so it confirm by id
 */
router.patch("/:id",(req:Request,res:Response,next:NextFunction)=>{
  // Todo update by ID api
})

/**
 *
 * * Delete by ID
 * @id
 *
 */
router.delete("/:id",(req:Request,res:Response,next:NextFunction)=>{
  //TODO delete by Id API
})

export default router;


/**
 *
 * * import routes from "./template.ts"
 * * app.use("/template",routes);
 *
 *
 *
 */