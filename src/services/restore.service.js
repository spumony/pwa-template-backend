import { v4 as uuidv4 } from 'uuid';

import UserModel from '~/models/user.model';
import { hash } from '~/utils';
import { sendMail } from '~/utils/mail';
import ResponseError from '~/utils/server/response-error';

export default class RestoreService {
  static restoreBegin = async ({ email }) => {
    const findUser = await UserModel.findOne({ email });
    if (!findUser) {
      throw new ResponseError('User with given email is not found');
    }

    const now = new Date();
    const { restoreExpireDate } = findUser;

    if (now < restoreExpireDate) {
      throw new ResponseError('There is already a restore request');
    }

    const restoreCode = uuidv4();

    await UserModel.updateOne(
      { email },
      {
        $set: {
          restoreCode,
          restoreExpireDate: new Date(new Date().getTime() + 3600000),
        },
      },
    );

    sendMail({
      from: 'support@pwa-template-backend.md',
      to: email,
      subject: 'Password restoration',
      text: `/restore/${restoreCode}`,
    });
  };

  static restoreEnd = async ({ restoreCode, password }) => {
    const user = await UserModel.findOne({ restoreCode });
    if (!user) {
      throw new ResponseError('Invalid or expired restoration code');
    }

    const newPassword = hash(password);
    if (user.password === newPassword) {
      throw new ResponseError("New password can't be the same as old one");
    }

    const now = new Date();
    const { _id, restoreExpireDate } = user;

    if (new Date(restoreExpireDate) < now) {
      throw new ResponseError('Wrong or expired restoration code');
    }

    await UserModel.updateOne(
      { _id },
      {
        $set: {
          password: hash(password),
          restoreCode: uuidv4(),
          restoreExpireDate: new Date(),
        },
      },
    );

    return true;
  };
}
