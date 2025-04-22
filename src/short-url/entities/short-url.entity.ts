import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  originalUrl: string;

  @Column({ type: 'varchar', length: 6, unique: true, nullable: false })
  shortCode: string;

  @Column({ type: 'int', default: 0 })
  clickCount: number;

  @ManyToOne(() => User, user => user.shortUrls, { nullable: true })
  user: User | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}