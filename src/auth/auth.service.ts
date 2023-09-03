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
        user: 'User does not exist',
        accessToken: null,
      };
    }

    const isSuccess = await bcrypt.compare(
      loginUserInput.password,
      user.password,
    );

    if (!isSuccess) {
      return {
        message: 'Unauthorized, Log In Failed',
        user: 'Password Mismatch',
        accessToken: null,
      };
    }

    const payload = { username: loginUserInput.name };
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '30s',
    });

    return { message: 'Login Successful', user: 'User exists', accessToken };
  }

  async refreshToken(username: string): Promise<any> {
    const user = await this.userService.findOneByName(username);

    if (!user) {
      return {
        message: 'Unauthorized, Log In Failed',
        user: 'User does mot exist',
        accessToken: 'null',
      };
    }

    const payload = { username };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '10m',
    });

    return user
      ? {
          message: 'Logged In Successfully',
          user: user.name,
          accessToken,
        }
      : {
          message: 'Unauthorized, Log In Failed',
          user: 'null',
          accessToken: 'null',
        };
  }
}
