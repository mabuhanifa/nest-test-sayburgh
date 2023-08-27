import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
export class User {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;
}
