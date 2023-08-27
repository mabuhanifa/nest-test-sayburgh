import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/user/entities/user.entity';
import { Column, ManyToMany } from 'typeorm';

@InputType()
export class CreateCommunityInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  name: string;

  @IsNotEmpty()
  @ManyToMany(() => User, (user) => user.communities)
  @Field(() => [User])
  user: User[];
}
