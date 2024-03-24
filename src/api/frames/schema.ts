import * as yup from 'yup';

const createFrame = {
  imageUrl: yup.string(),
  videoUrl: yup.string(),
  buttons: yup.array().of(
    yup.object().shape({
      action: yup.string(),
      target: yup.string(),
      label: yup.string(),
    }),
  ),
  inputText: yup.string(),
  walletAddress: yup.string().required(),
};

const renderFrame = {
  frameId: yup.string().required(),
  walletAddress: yup.string().required(),
};

const renderUserFrames = {
  walletAddress: yup.string().required(),
};

export const createFrameSchema = new yup.ObjectSchema(createFrame);
export const renderFrameSchema = new yup.ObjectSchema(renderFrame);
export const renderUserFramesSchema = new yup.ObjectSchema(renderUserFrames);
