import { Injectable } from '@nestjs/common';
import { CreateContactInfoInput } from './dto/create-contact-info.input';
import { UpdateContactInfoInput } from './dto/update-contact-info.input';

@Injectable()
export class ContactInfoService {
  create(createContactInfoInput: CreateContactInfoInput) {
    return 'This action adds a new contactInfo';
  }

  findAll() {
    return `This action returns all contactInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contactInfo`;
  }

  update(id: number, updateContactInfoInput: UpdateContactInfoInput) {
    return `This action updates a #${id} contactInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactInfo`;
  }
}
