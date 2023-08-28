import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommunityModule } from 'src/community/community.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), CommunityModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
