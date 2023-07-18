import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing.');
  }

  const [type, token] = authHeader.split(' ');

  try {
    //confere se foi gerada com a nossar chave
    const decodeToken = verify(token, authConfig.jwt.secret);

    /*
    //console.log('🚀 ~ file: isAuthenticated.ts:22 ~ decodeToken:', decodeToken);
🚀 ~ file: isAuthenticated.ts:22 ~ decodeToken: {
    iat: 1689719075,
    exp: 1689805475,
    sub: '71c144f1-4980-4637-a69a-1fa3ce150074'
    } */
    const { sub } = decodeToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Invalid JWT Token.');
  }
}
