import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guards';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => LoginResponse)
  @UseGuards(JwtAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    const payload = { username: loginUserInput.name };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    console.log({ user: context.user });

    context.res.cookie('token', refreshToken, { httpOnly: true });

    return this.authService.login(loginUserInput);
  }
}
