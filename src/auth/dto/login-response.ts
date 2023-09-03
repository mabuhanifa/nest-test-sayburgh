import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginResponse {
  @Field()
  message: string;

  @Field()
  accessToken: string | null;

  @Field(() => String)
  user: string;
}
