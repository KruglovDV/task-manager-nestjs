import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Task } from '../tasks/task.entity';

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

  @OneToMany(() => Task, (task) => task.creator)
  createdTasks: Task[];

  @OneToMany(() => Task, (task) => task.executor)
  tasksAtWork: Task[];
}
