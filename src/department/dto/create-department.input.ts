import { InputType, Int, Field } from '@nestjs/graphql';
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Employee } from 'src/employee/entities/employee.entity';

@InputType()
export class CreateDepartmentInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Field(() => [Int], { nullable: true })
  employees?: number[];
}
