import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { addFrames, createUser, fetchUserFrames } from './controller';
import { addFramesValidator, signUpValidator } from './validator';
const userRouter = Router();

async function handleSignUp(req: Request, res: Response) {
  try {
    const result = await createUser(req.body);
    if (result.bool) {
      res.status(201).json({
        message: 'Success',
      });
    } else {
      throw {
        status: 400,
        message: result.message,
      };
    }
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleFetchUserFrames(req: Request, res: Response) {
  try {
    const walletAddress = req.params.walletAddress;
    console.log(walletAddress);
    const user = await fetchUserFrames(walletAddress.toString());
    res.status(200).json({
      message: 'Success',
      data: user,
    });
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

async function handleAddFrames(req: Request, res: Response) {
  try {
    const result = await addFrames(req.body.walletAddress, req.body.framePayload);
    if (result.bool) {
      res.status(201).json({
        data: result.data,
        message: 'Frame Added',
      });
    } else {
      throw {
        status: 400,
        message: result.message,
      };
    }
  } catch (e) {
    LoggerInstance.error(e);
    res.status(e.status || 500).json({
      message: e.message || 'Request Failed',
    });
  }
}

userRouter.post('/signUp', signUpValidator, handleSignUp);

userRouter.get('/fetchUserFrames/:walletAddress', handleFetchUserFrames);

userRouter.post('/addFrame', addFramesValidator, handleAddFrames);

export default userRouter;
