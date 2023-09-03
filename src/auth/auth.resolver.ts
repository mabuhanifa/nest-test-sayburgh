import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { ForbiddenException } from '@nestjs/common';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => LoginResponse)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    const payload = { username: loginUserInput.name };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '60m',
      secret: process.env.JWT_SECRET,
    });

    context.res.cookie('refreshToken', refreshToken, { httpOnly: true });

    return this.authService.login(loginUserInput);
  }

  @Mutation(() => LoginResponse)
  async newAccessToken(@Context() context) {
    try {
      const oldRefreshToken = context.req.cookies.refreshToken;

      const decoded = await this.jwtService.verify(oldRefreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const payload = { username: decoded?.username } || null;

      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: '1d',
        secret: process.env.JWT_SECRET,
      });

      payload &&
        context.res.cookie('refreshToken', refreshToken, { httpOnly: true });

      return await this.authService.refreshToken(payload?.username);
    } catch (error) {
      throw new ForbiddenException('Invalid access token');
    }
  }

  @Mutation(() => Boolean)
  async logout(@Context() context) {
    try {
      context.res.cookie('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0),
      });

      return true;
    } catch (error) {
      throw new ForbiddenException('Failed to log out');
    }
  }
}
