import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';
import AppError from '../errors/Error';

interface Request {
  email: string;
  password: string;
}

export default class AuthenticateUser {
  public async execute({ email, password }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } })

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    return user;
  };
}

