import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToMany } from 'typeorm';

@InputType()
export class CreateCommunityInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => [Int])
  users: number[];
}
