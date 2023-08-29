import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateEmployeeInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => Int)
  departmentId: number;

  @IsNotEmpty()
  @IsNumber()
  @Field(() => [Int])
  projects: number[];
}
