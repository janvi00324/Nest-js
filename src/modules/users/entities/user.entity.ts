import { ROLES } from '../../../utils/constant';
import type { RoleType } from '../../../utils/constant';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'fullname', length: 100, type: 'varchar' })
  fullname: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 200 })
  password: string;

  @Column({ name: 'profile_image', type: 'text', nullable: true })
  profileImage: string;

  @Column({ name: 'is_verified', type: 'boolean', default: false })
  isVerified: boolean;

  @Column({ type: 'varchar', length: 10, nullable: true })
  otp: string;

  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role: RoleType;

  // @Column({ type: 'text', nullable: true })
  // refreshToken: string | null;
  
  //timestamp,timestamptz,date,time
  @CreateDateColumn({ name: 'created_at', type: 'date' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'date' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'time with time zone' })
  deletedAt: Date;
}
