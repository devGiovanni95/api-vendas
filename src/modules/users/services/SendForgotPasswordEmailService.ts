import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import { hash } from 'bcryptjs';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = await userTokensRepository.generate(user.id);
    console.log(
      '🚀 ~ file: SendForgotPasswordEmailService.ts:23 ~ SendForgotPasswordEmailService ~ execute ~ token:',
      token,
    );
  }
}

export default SendForgotPasswordEmailService;
