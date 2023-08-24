import { Injectable } from '@nestjs/common';
import { CreateContactInfoInput } from './dto/create-contact-info.input';
import { UpdateContactInfoInput } from './dto/update-contact-info.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfo } from './entities/contact-info.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ContactInfoService {
  constructor(
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
  ) {}

  create(createContactInfoInput: CreateContactInfoInput) {
    const contactInfo = new ContactInfo();
    contactInfo.phone = createContactInfoInput.phone;
    contactInfo.employeeId = createContactInfoInput.employeeId;
    return this.contactInfoRepository.save(contactInfo);
  }

  findAll() {
    return this.contactInfoRepository.find();
  }

  async findOne(id: number) {
    const contactInfo = await this.contactInfoRepository.findOne({
      where: { id },
      relations: ['employee'],
    });
    console.log(contactInfo);
    return contactInfo;
  }

  update(id: number, updateContactInfoInput: UpdateContactInfoInput) {
    return `This action updates a #${id} contactInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} contactInfo`;
  }
}
