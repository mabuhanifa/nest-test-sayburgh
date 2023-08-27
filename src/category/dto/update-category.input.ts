import { IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoryInput } from './create-category.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput extends PartialType(CreateCategoryInput) {
  @IsNotEmpty()
  @IsString()
  @Field(() => Int)
  id: number;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;
}
