import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'community' })
@ObjectType({ description: 'Object representing a community' })
export class Community {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int, { description: 'Unique ID of the community' })
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => User)
  @JoinTable()
  @Field(() => [User], { nullable: true })
  users: User[];
}
