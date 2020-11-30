import dotenv from 'dotenv';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import routes from './routes';
import Error from './errors/Error';
import cors from 'cors';
import './database';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

app.listen(3333, () => {
  console.log('Finance Started!');
});
