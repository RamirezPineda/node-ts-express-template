import { QueryOptions } from '@/common/interfaces';
import {
  ResponseError,
  convertToQuery,
  excludeAttributes,
  removeValuesUndefined,
} from '@/common/utils';
import { Bcrypt } from '@/auth/utils';

import { UserRepository } from '@/users/repositories/user.repository';
import { UserCreateDto, UserUpdateDto } from '@/users/dto';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(queryOptions: QueryOptions) {
    const query = convertToQuery(queryOptions);
    const users = await this.userRepository.findAll(query);

    const usersWithoutPassword = users.map((user) =>
      excludeAttributes(user, ['password']),
    );

    const countData = await this.userRepository.countData(query);
    return { data: usersWithoutPassword, countData };
  }

  async create(userCreateDto: UserCreateDto) {
    const userFound = await this.userRepository.findByEmail(
      userCreateDto.email,
    );

    if (userFound) {
      throw new ResponseError({
        messages: ['There is already a user with that email'],
      });
    }

    const passwordHash = await Bcrypt.encryptPassword(userCreateDto.password);
    const newUser = await this.userRepository.create({
      ...userCreateDto,
      password: passwordHash,
    });

    const user = excludeAttributes(newUser, ['password']);
    return user;
  }

  async findById(id: string) {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new ResponseError({ messages: ['User not found'] });
    }

    const user = excludeAttributes(userFound, ['password']);
    return user;
  }

  async update(id: string, userUpdateDto: UserUpdateDto) {
    const userFound = await this.findById(id);

    if (userUpdateDto.email) {
      const anotherUser = await this.userRepository.findByEmail(
        userUpdateDto.email,
      );

      if (anotherUser && userFound.id !== anotherUser.id) {
        throw new ResponseError({
          messages: ['There is already a user with that email'],
        });
      }
    }

    let password: string | undefined = undefined;
    if (userUpdateDto.password) {
      const passwordHash = await Bcrypt.encryptPassword(userUpdateDto.password);
      password = passwordHash;
    }

    const userDto = { ...userUpdateDto, password };
    const data = removeValuesUndefined(userDto);

    const userUpdated = await this.userRepository.update(id, data);

    if (!userUpdated) {
      throw new ResponseError({
        messages: ['An error occurred while updating the user'],
      });
    }

    const user = excludeAttributes(userUpdated, ['password']);
    return user;
  }

  async enableOrDisable(id: string, isActive: boolean) {
    await this.userRepository.findById(id);
    const userUpdated = await this.userRepository.enableOrDisable(id, isActive);

    if (!userUpdated) {
      throw new ResponseError({
        messages: ['An error occurred while updating the user'],
      });
    }

    const user = excludeAttributes(userUpdated, ['password']);
    return user;
  }
}
