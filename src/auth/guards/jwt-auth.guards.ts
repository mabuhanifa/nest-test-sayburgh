import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const jwt = ctx.req.headers.authorization.split(' ')[1];

    try {
      const decoded = this.jwtService.verify(jwt, {
        secret: process.env.JWT_SECRET,
      });

      console.log({ decoded, jwt }, 'decoded-jwt');

      ctx.user = decoded;

      return true;
    } catch (error) {
      throw new ForbiddenException('Invalid access token');
    }
  }
}
