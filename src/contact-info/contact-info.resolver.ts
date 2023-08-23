import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactInfoService } from './contact-info.service';
import { ContactInfo } from './entities/contact-info.entity';
import { CreateContactInfoInput } from './dto/create-contact-info.input';
import { UpdateContactInfoInput } from './dto/update-contact-info.input';

@Resolver(() => ContactInfo)
export class ContactInfoResolver {
  constructor(private readonly contactInfoService: ContactInfoService) {}

  @Mutation(() => ContactInfo)
  createContactInfo(@Args('createContactInfoInput') createContactInfoInput: CreateContactInfoInput) {
    return this.contactInfoService.create(createContactInfoInput);
  }

  @Query(() => [ContactInfo], { name: 'contactInfo' })
  findAll() {
    return this.contactInfoService.findAll();
  }

  @Query(() => ContactInfo, { name: 'contactInfo' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contactInfoService.findOne(id);
  }

  @Mutation(() => ContactInfo)
  updateContactInfo(@Args('updateContactInfoInput') updateContactInfoInput: UpdateContactInfoInput) {
    return this.contactInfoService.update(updateContactInfoInput.id, updateContactInfoInput);
  }

  @Mutation(() => ContactInfo)
  removeContactInfo(@Args('id', { type: () => Int }) id: number) {
    return this.contactInfoService.remove(id);
  }
}
