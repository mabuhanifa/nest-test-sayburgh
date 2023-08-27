import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Community } from 'src/community/entities/community.entity';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
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
