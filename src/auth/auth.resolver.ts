import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginResponse } from './dto/login-response';
import { LoginUserInput } from './dto/login-user.input';
import { Res, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './guards/local-auth.guards';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Mutation(() => LoginResponse)
  //@UseGuards(GqlAuthGuard)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context,
  ) {
    const payload = { username: loginUserInput.name };

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    console.log(context.res);
    context.res.cookie('token', refreshToken, { httpOnly: true });
    return this.authService.login(loginUserInput);
  }
}
