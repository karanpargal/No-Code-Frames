import * as yup from 'yup';

const signUp = {
  username: yup.string(),
  walletAddress: yup.string().required(),
};

export const signUpSchema = new yup.ObjectSchema(signUp);
