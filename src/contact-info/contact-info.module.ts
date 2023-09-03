import { Module } from '@nestjs/common';
import { ContactInfoService } from './contact-info.service';
import { ContactInfoResolver } from './contact-info.resolver';
import { ContactInfo } from './entities/contact-info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactInfo]),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [ContactInfoResolver, ContactInfoService],
})
export class ContactInfoModule {}
