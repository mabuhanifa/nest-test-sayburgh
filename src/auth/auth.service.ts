import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string) {
    const user = await this.userService.findOneByName(name);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput) {
    const user = await this.userService.findOneByName(loginUserInput.name);

    if (!user) {
      return null;
    }

    const payload = {
      username: user.name,

      sub: {
        name: user.name,
      },
    };

    return {
      user: user.name,

      access_token: this.jwtService.sign(payload),
    };
  }
}
