import { NextFunction } from 'express';
import { Router, Request, Response } from 'express';

const router = Router();


// TODO: Better Comments
// TODO: https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments

/**
 *
 * *Create insert into DB
 */
router.post("/",(req:Request,res:Response,next:NextFunction)=>{
  //Todo insert into DB
})


/**
 *
 ** Get all from DB
 */
router.get("/",(req:Request,res:Response,next:NextFunction)=>{
  // Todo get all from DB

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