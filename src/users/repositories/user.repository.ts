import { Repository } from 'typeorm';
import { DB } from '@/common/database/connection.database';
import type { Query } from '@/common/interfaces';

import { User } from '@/users/entities/user.entity';
import type { UserCreateDto, UserUpdateDto } from '@/users/dto';

export class UserRepository {
  #repository: Repository<User>;

  constructor() {
    this.#repository = DB.getRepository(User);
  }

  async findAll(query: Query): Promise<User[]> {
    return this.#repository.find({ ...query });
  }

  async countData(query: Query): Promise<number> {
    return this.#repository
      .createQueryBuilder()
      .where({ ...query.where })
      .getCount();
  }

  async create(userCreateDto: UserCreateDto): Promise<User> {
    const newUser = this.#repository.create(userCreateDto);
    return this.#repository.save(newUser);
  }

  async findById(id: string): Promise<User | null> {
    return this.#repository.findOne({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.#repository.findOne({
      where: { email },
      select: ['id', 'email', 'name', 'isActive', 'password', 'role'],
    });
  }

  async update(id: string, data: UserUpdateDto): Promise<User | null> {
    const updateResult = await this.#repository.update(id, { ...data });
    if (!updateResult) return null;
    return this.findById(id);
  }

  async enableOrDisable(id: string, isActive: boolean): Promise<User | null> {
    const updateResult = await this.#repository.update(id, { isActive });
    if (!updateResult) return null;
    return this.findById(id);
  }
}
