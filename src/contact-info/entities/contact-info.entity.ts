import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import { Column, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class ContactInfo {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => Int)
  employeeId: number;

  @OneToOne(() => Employee, (employee) => employee.id)
  @JoinColumn()
  employee: Employee;
}
