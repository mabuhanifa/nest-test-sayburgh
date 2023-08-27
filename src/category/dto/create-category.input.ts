import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@InputType()
export class CreateCategoryInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
