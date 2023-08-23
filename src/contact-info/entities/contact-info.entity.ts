import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class ContactInfo {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
