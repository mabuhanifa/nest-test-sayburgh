import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CommunityModule } from 'src/community/community.module';
import { CommunityService } from 'src/community/community.service';
import { LocalStrategy } from './strategies/local-strategies';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
  ],
  providers: [AuthResolver, AuthService, JwtService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
