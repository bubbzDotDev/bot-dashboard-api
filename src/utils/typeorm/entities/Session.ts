import { ISession } from 'connect-typeorm';
import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Session implements ISession {
  @Index()
  @Column({ type: 'bigint', name: 'expired_at' })
  expiredAt: number;

  @PrimaryColumn('varchar', { length: 255 })
  id = '';

  @Column('text')
  json = '';

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
