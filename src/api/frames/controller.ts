import { Frame, FrameButtonsType, getFrameHtml } from 'frames.js';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { FrameData, RenderFrame } from './model';
import { ObjectId } from 'mongodb';

export async function createFrame(frameData: FrameData): Promise<any> {
  try {
    const frame: Frame = {
      version: 'vNext',
      image: frameData.imageUrl,
      ogImage: frameData.imageUrl,
      buttons: frameData.buttons as unknown as FrameButtonsType,
      inputText: frameData.inputText,
      postUrl: frameData.postUrl,
    };

    const frameHtml = getFrameHtml(frame);

    const frames = await (await database()).collection('frames').insertOne({
      frame: frameHtml,
    });

    const user = await (await database()).collection('users').findOne({ walletAddress: frameData.walletAddress });
    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      };
    }

    let newFrames = [];
    newFrames = user.frames;
    newFrames.push(frames);

    await (await database()).collection('users').updateOne({ _id: user._id }, { $set: { frames: newFrames } });

    return {
      bool: true,
      message: 'Success, Frame created.',
      status: 200,
      data: frameHtml,
    };
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      bool: false,
      message: 'Frame could not be created',
      status: 400,
    };
  }
}

export async function renderFrame(renderFrame: RenderFrame): Promise<any> {
  try {
    const frameId = renderFrame.frameId;
    console.log(frameId);

    const frameHtml = await (await database()).collection('frames').findOne({ _id: new ObjectId(frameId) });

    if (!frameHtml) {
      throw {
        status: 404,
        message: 'Frame not found',
      };
    }

    return {
      bool: true,
      message: 'Success',
      data: frameHtml,
    };
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      bool: false,
      message: 'Frame could not be rendered',
      status: 400,
    };
  }
}
