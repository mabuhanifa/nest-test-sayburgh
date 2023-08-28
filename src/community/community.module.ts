import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityResolver } from './community.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Community]), UserModule],
  providers: [CommunityResolver, CommunityService],
})
export class CommunityModule {}
