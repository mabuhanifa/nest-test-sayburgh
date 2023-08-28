import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommunityModule } from 'src/community/community.module';
import { CommunityService } from 'src/community/community.service';
import { Community } from 'src/community/entities/community.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => CommunityModule),
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
