import { Module } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoResolver } from './contact-info.resolver';

@Module({
  providers: [ContactInfoResolver, ContactInfoService],
})
export class ContactInfoModule {}
