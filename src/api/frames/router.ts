import { Router, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { createFrame, renderFrame } from './controller';
import { createFrameValidator, renderFrameValidator } from './validator';
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

framesRouter.post('/createFrame', createFrameValidator, handleCreateFrame);

framesRouter.get('/renderFrame', renderFrameValidator, handleRenderFrame);

export default framesRouter;
