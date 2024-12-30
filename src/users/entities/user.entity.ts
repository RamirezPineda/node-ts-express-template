import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/common/entities';
import { ROLE } from '@/common/constants';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({ name: 'name', type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 100,
    nullable: false,
    select: false,
  })
  password: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: ROLE,
    default: ROLE.ADMIN,
    nullable: false,
  })
  role: ROLE;

  @Column({
    name: 'is_active',
    type: 'boolean',
    default: true,
    nullable: false,
  })
  isActive: boolean;
}
