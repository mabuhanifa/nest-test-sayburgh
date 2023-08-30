import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Community } from 'src/community/entities/community.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
@ObjectType({ description: 'Object representing a user' })
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Community)
  @JoinTable()
  @Field(() => [Community], { nullable: true })
  communities?: Community[];
}
