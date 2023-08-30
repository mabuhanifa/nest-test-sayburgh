import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { LoginResponse } from './dto/login-response';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string) {
    const user = await this.userService.findOneByName(name);
    console.log(user);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(loginUserInput: LoginUserInput): Promise<LoginResponse> {
    const user = await this.userService.findOneByName(loginUserInput.name);

    if (!user) {
      return {
        message: 'Unauthorized, Log In Failed',
        user: 'User does mot exist',
        accessToken: 'null',
      };
    }

    const isSuccess = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    return isSuccess
      ? {
          message: 'Logged In Successfully',

          user: user.name,

          accessToken: this.jwtService.sign({
            name: user.name,
            sub: user.id,
          }),
        }
      : {
          message: 'Unauthorized, Log In Failed',
          user: 'null',
          accessToken: 'null',
        };
  }
}
