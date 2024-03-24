import { Frame, FrameButtonsType, getFrameHtml } from 'frames.js';
import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import { FrameData, RenderFrame } from './model';
import { ObjectId } from 'mongodb';
import { Livepeer } from 'livepeer';
import axios from 'axios';

const livepeer = new Livepeer({
  apiKey: process.env.LIVEPEER_API_KEY,
});

export async function createFrame(frameData: FrameData): Promise<any> {
  try {
    if (frameData.videoUrl) {
      const livepeerStream = await livepeer.asset.createViaURL({
        name: 'Frame Video' + Math.random(),
        url: frameData.videoUrl,
      });

      const frameHtml = `
      <html>

<head>
  <link href="https://vjs.zencdn.net/8.10.0/video-js.css" rel="stylesheet" />
  <meta property="fc:frame" content="vNext" />
  <meta property="fc:frame:video"
    content="${livepeerStream.object.asset.playbackUrl}" />
  <meta property="fc:frame:video:type" content="application/x-mpegURL" />
  <meta property="fc:frame:image" content="https://www.w3schools.com/w3images/mountains.jpg" />
  <meta property="og:image" content="https://www.w3schools.com/w3images/mountains.jpg" />
</head>

<body>
  <video id="my-video" class="video-js" controls preload="auto" width="640" height="264" poster="MY_VIDEO_POSTER.jpg"
    data-setup="{}">
    <source src="https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8" type="application/x-mpegURL" />
    <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
    </p>
  </video>

  <script src="https://vjs.zencdn.net/8.10.0/video.min.js"></script>
</body>
</html>`;

      if (!livepeerStream) {
        throw {
          message: 'Video frames not supported',
          status: 400,
        };
      }

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
    }
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
