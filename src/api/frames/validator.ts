import { NextFunction, Request, Response } from 'express';
import LoggerInstance from '../../loaders/logger';
import { createFrameSchema, renderFrameSchema, renderUserFramesSchema } from './schema';

export async function createFrameValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await createFrameSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function renderFrameValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await renderFrameSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}

export async function renderUserFramesValidator(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    req.body = await renderUserFramesSchema.validate(req.body, { stripUnknown: true });
    next();
  } catch (e) {
    LoggerInstance.error(e);
    res.status(422).json({
      message: 'Validation Failed',
      error: e.errors.map(error => error),
    });
  }
}
