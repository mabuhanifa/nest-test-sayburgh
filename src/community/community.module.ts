import { Module, forwardRef } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityResolver } from './community.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community]),
    forwardRef(() => UserModule),
  ],
  providers: [CommunityResolver, CommunityService],
  exports: [CommunityService],
})
export class CommunityModule {}
