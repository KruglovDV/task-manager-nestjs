import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  readonly email: string;

  @Column()
  readonly password: string;

  @Column({ default: true })
  isActive: boolean;
}
