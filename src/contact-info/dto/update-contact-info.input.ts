import { CreateContactInfoInput } from './create-contact-info.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContactInfoInput extends PartialType(CreateContactInfoInput) {
  @Field(() => Int)
  id: number;
}
