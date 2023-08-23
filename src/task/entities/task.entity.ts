import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
@ObjectType({ description: 'This is Task Object Type' })
export class Task {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToOne(() => Employee, (employee) => employee.tasks, {
    onDelete: 'SET NULL',
  })
  @Field(() => Employee)
  employee: Employee;
}
