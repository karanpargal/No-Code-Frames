import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { createFrame, renderUserFrame, renderFrame, fetchFrame } from './controller';
import { createFrameValidator, renderFrameValidator, renderUserFramesValidator } from './validator';
import { stat } from 'fs';
const framesRouter = Router();

async function handleCreateFrame(req: Request, res: Response) {
  try {
    const result = await createFrame(req.body);
    if (result.bool) {
      res.status(201).json({
        message: 'Success',
        data: result.data,
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

async function handleRenderFrame(req: Request, res: Response) {
  try {
    const result = await renderFrame(req.body);
    if (result.bool) {
      res.status(200).send({
        data: result.data,
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

async function handleRenderUserFrames(req: Request, res: Response) {
  try {
    const result = await renderUserFrame(req.body.walletAddress);
    if (result.bool) {
      res.status(200).send({
        data: result.data,
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

async function handleFetchFrame(req: Request, res: Response) {
  try {
    const result = await fetchFrame(req.params.frameId);
    if (result.bool) {
      return res.send(result.data.frame).status(200);
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

framesRouter.post('/createFrame', createFrameValidator, handleCreateFrame);

framesRouter.post('/renderFrame', renderFrameValidator, handleRenderFrame);

framesRouter.post('/renderUserFrames', renderUserFramesValidator, handleRenderUserFrames);

framesRouter.get('/fetchFrame/:frameId', handleFetchFrame);

export default framesRouter;
