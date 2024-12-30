import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';
import { AppDataSource } from '@/config/db.config';

export class DB {
  static getRepository = <T extends ObjectLiteral>(
    entity: EntityTarget<T>,
  ): Repository<T> => {
    return AppDataSource.getRepository(entity);
  };
}
