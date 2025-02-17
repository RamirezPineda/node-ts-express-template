import { type JwtPayload, sign, verify } from 'jsonwebtoken';

import { EnvConfig } from '@/config';
import type { User } from '@/users/entities/user.entity';

export class JsonWebToken {
  static convertToPayload(user: User): Omit<User, 'password' | 'createdAt' | 'updatedAt'> {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
    };
  }

  static getPayloadData(payload: JwtPayload): Omit<User, 'password'> {
    const payloadData = Object.fromEntries(Object.entries(payload).filter(([key]) => key !== 'iat' && key !== 'exp'));
    return payloadData as Omit<User, 'password'>;
  }

  static async generateToken(payload: Omit<User, 'password' | 'createdAt' | 'updatedAt'>) {
    return sign(payload, EnvConfig.JWT_SECRET, {
      expiresIn: EnvConfig.JWT_EXPIRATION,
    });
  }

  static async verifyToken(token: string): Promise<JwtPayload> {
    return verify(token, EnvConfig.JWT_SECRET) as JwtPayload;
  }
}
