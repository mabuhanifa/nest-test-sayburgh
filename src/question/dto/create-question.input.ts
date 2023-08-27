import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column } from 'typeorm';

@InputType()
export class CreateQuestionInput {
  @IsNotEmpty()
  @IsString()
  @Column()
  @Field(() => String)
  title: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  @Field(() => String)
  text: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => Int)
  categoryId: number;
}
