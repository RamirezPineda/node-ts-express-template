import { Request, Response } from 'express';

import type { QueryOptions, ResponseApi } from '@/common/interfaces';
import { handlerErrors } from '@/common/utils';

import { UserService } from '@/users/services/user.service';
import { UserCreateDto } from '@/users/dto/user-create.dto';
import { UserUpdateDto } from '@/users/dto';
import type { User } from '@/users/entities/user.entity';

export class UserController {
  constructor(private readonly userService: UserService) {}

  async findAll(req: Request, res: Response) {
    try {
      const queryOptions: QueryOptions = req.query;
      const response = await this.userService.findAll(queryOptions);
      const responseApi: ResponseApi = {
        statusCode: 200,
        data: response.data,
        countData: response.countData,
      };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const userCreateDto: UserCreateDto = req.body.data;
      const newUser = await this.userService.create(userCreateDto);
      const responseApi: ResponseApi = { statusCode: 201, data: newUser };

      res.status(201).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      const responseApi: ResponseApi = { statusCode: 200, data: user };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userUpdateDto: UserUpdateDto = req.body.data;
      const userUpdated = await this.userService.update(id, userUpdateDto);
      const responseApi: ResponseApi = { statusCode: 200, data: userUpdated };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async enableOrDisable(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { isActive } = req.body.data;
      const user = await this.userService.enableOrDisable(id, isActive);
      const responseApi: ResponseApi = { statusCode: 200, data: user };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async getProfile(req: Request, res: Response) {
    try {
      const user: Omit<User, 'password'> = req.body.payload;
      const userFound = await this.userService.findById(user.id);
      const responseApi: ResponseApi = { statusCode: 200, data: userFound };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }

  async updateProfile(req: Request, res: Response) {
    try {
      const user: Omit<User, 'password'> = req.body.payload;
      const userUpdateDto: UserUpdateDto = req.body.data;
      const userUpdated = await this.userService.update(user.id, userUpdateDto);
      const responseApi: ResponseApi = { statusCode: 200, data: userUpdated };

      res.status(200).json(responseApi);
    } catch (error) {
      handlerErrors(res, error);
    }
  }
}
