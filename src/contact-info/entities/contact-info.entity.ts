import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Employee } from 'src/employee/entities/employee.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'contactInfo' })
@ObjectType({ description: 'This is ContactInfo Object Type' })
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

  @OneToOne(() => Employee, (employee) => employee.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  employee: Employee;
}
