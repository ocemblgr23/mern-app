import express, { Request, Response } from 'express';
import taskRoute from './task';
import cors from 'cors';
import mongoose, { Schema, model, connect } from 'mongoose';
import dotenv from 'dotenv';
import * as uuid from 'uuid';
import workerRoute from './routes/worker';
import courseRoute from './routes/course';
import { run } from './config/connection';
import { errorHandeler } from './config/error-middleware';
import multer from 'multer';
import path from 'path';
import sharp from 'sharp';
import * as fs from 'fs';

const app = express();
const port = process.env.PORT || 3000;

dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

//Todo add tasks route
app.use('/tasks', taskRoute);

// const run = async () =>{
//     try {
//         // @ts-ignore
//         await  mongoose.connect(process.env.MONGOVRENT,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log("Connected to Remote DB")
//         console.log(uuid.v4())
//     } catch (e) {
//         console.log(e)
//     }

// }
// Connect to DB
run();

// User model start here
interface IUser {
  cname: string;
  age: number;
  profile?: string;
}
// Create schema
const userSchema = new Schema<IUser>({
  cname: { type: String },
  age: { type: Number },
  profile: String,
});
// Create a model
const User = model<IUser>('User', userSchema);

// Todo add worker route
app.use('/worker', workerRoute);
app.use('/apiv1/course', courseRoute);

app.get('/', async (req: Request, res: Response) => {
  const user = new User({
    cname: 'J Dalal Mahapatra',
    age: 27,
    profile: `${uuid.v4()}`,
  });
  const _user = await user.save();
  res.jsonp({ message: 'Hello, TypeScript Express!', user: _user });
});

app.get('/health', (req: Request, res: Response) => {
  res.status(200).jsonp({
    message: 'Health Check done.',
  });
});

const UPLOAD_PATH = path.join(path.resolve(), '/uploads');

// File uplaod
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + '_' + file.originalname);
  },
});
// const upload = multer({dest:"uploads/"})
const upload = multer({ storage: storage });
app.post(
  '/upload',
  upload.single('image'),
  async (req: Request, res: Response) => {
    fs.access('./uploads', (error) => {
      if (error) {
        fs.mkdirSync('./uploads');
      }
    });

    // const timestamp = new Date().toISOString();
    // const ref = `${timestamp}-${req.file?.originalname}.webp`;
    // await sharp(req.file?.filename).webp({ quality: 20 }).toFile('./uploads'+ref);
    // console.log();
    res.status(201).jsonp({ file: req.file?.filename });
    // compress the image and save
    // const compress = await sharp(image.path).resize().jpeg({quality:50}).toFile(image.path);
    // console.log(compress);
  }
);

app.use(errorHandeler);

app.listen(port, () => {
  console.log(`Server running under http://localhost:${port}`);
});
