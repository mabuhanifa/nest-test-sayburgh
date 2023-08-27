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
@ObjectType({ description: 'This is User Object Type' })
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Community, (community) => community.user, {
    cascade: true,
  })
  @JoinTable()
  @Field(() => [Community])
  communities: Community[];
}
