import { Router } from 'express';
import userRouter from './users/router';
import framesRouter from './frames/router';

export default (): Router => {
  const app = Router();

  app.use('/users', userRouter);

  app.use('/frames', framesRouter);

  return app;
};
