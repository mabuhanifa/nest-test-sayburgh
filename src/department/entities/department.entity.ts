import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'department' })
@ObjectType({ description: 'This is department Object Type' })
export class Department {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @OneToMany(() => Employee, (employee) => employee.department)
  @Field(() => [Employee])
  employees: Employee[];
}
