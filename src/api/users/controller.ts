import database from '../../loaders/database';
import LoggerInstance from '../../loaders/logger';
import User from './model';

export async function createUser(user: User): Promise<any> {
  const userExists = await (await database()).collection('users').findOne({ walletAddress: user.walletAddress });
  if (userExists) {
    throw {
      bool: false,
      message: 'User already exists',
      status: 200,
    };
  } else {
    try {
      user.username = '';

      user.frames = [];

      await (await database()).collection('users').insertOne(user);
      return {
        bool: true,
        message: 'Success, User created.',
        status: 200,
      };
    } catch (e) {
      LoggerInstance.error(e);
      throw {
        bool: false,
        message: 'User could not be created',
        status: 400,
      };
    }
  }
}

export async function fetchUserFrames(address: string) {
  try {
    const projection = { frames: 1, walletAddress: 1 };
    console.log('Searching for user with wallet address:', address);
    const user = await (await database())
      .collection('users')
      .findOne({ walletAddress: address.trim() }, { projection });
    console.log('User found:', user);
    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      };
    }
    return user.frames;
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}

export async function addFrames(address: string, payload: string) {
  try {
    const user = await (await database()).collection('users').findOne({ walletAddress: address });
    if (!user) {
      throw {
        message: 'User not found',
        status: 404,
      };
    }

    let newFrames = [];
    newFrames = user.frames;
    newFrames.push(payload);

    console.log(address);

    await (await database()).collection('users').updateOne({ _id: user._id }, { $set: { frames: newFrames } });

    return {
      data: newFrames,
      bool: true,
      message: 'Success, User created.',
      status: 200,
    };
  } catch (e) {
    LoggerInstance.error(e);
    throw {
      message: 'Unauthorized Access',
      status: 401,
    };
  }
}
