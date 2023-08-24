import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateContactInfoInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  phone: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  employeeId: number;
}
