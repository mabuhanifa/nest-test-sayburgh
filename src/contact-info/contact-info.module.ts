import { Module } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoResolver } from './contact-info.resolver';
import { ContactInfo } from './entities/contact-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfo])],
  providers: [ContactInfoResolver, ContactInfoService],
})
export class ContactInfoModule {}
