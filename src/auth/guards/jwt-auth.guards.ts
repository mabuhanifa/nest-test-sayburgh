import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.cookies.refreshToken;

    // console.log({ token });

    try {
      const decoded = this.jwtService.verify(token);

      // console.log({ decoded });

      ctx.user = decoded;

      return true;
    } catch {
      return false;
    }
  }
}
