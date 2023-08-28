import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => [Int], { nullable: true })
  communities: number[];
}
