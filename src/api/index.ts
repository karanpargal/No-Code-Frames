import { Router } from 'express';
import userRouter from './users/router';

export default (): Router => {
  const app = Router();

  app.use('/users', userRouter);

  return app;
};
