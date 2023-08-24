import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
