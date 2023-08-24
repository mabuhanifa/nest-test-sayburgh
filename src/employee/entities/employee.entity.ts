import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ContactInfo } from 'src/contact-info/entities/contact-info.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'employee' })
@ObjectType({ description: 'This is Employee Object Type' })
export class Employee {
  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employeeId)
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  email: string;
}
