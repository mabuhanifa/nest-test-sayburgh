import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Example field (placeholder)' })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => [Int])
  communities: number[];
}
