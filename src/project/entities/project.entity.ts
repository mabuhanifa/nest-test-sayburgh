import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'project' })
@ObjectType({ description: 'This is Project Object Type' })
export class Project {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  // @ManyToMany(() => Employee)
  // @JoinTable()
  // @Field(() => [Employee])
  // employees: Employee[];
}
