import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local-strategies';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '10s' },
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
