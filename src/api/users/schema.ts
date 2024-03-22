import * as yup from 'yup';

const signUp = {
  username: yup.string(),
  walletAddress: yup.string().required(),
};

const addFrames = {
  walletAddress: yup.string().required(),
  framePayload: yup.string().required(),
};

export const signUpSchema = new yup.ObjectSchema(signUp);
export const addFrameSchema = new yup.ObjectSchema(addFrames);
