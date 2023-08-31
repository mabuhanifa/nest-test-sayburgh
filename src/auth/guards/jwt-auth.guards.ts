import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context).getContext();
    const token = ctx.req.cookies.token; // Access the 'token' cookie

    try {
      const decoded = this.jwtService.verify(token);
      ctx.user = decoded; // Attach the decoded user to the context
      return true;
    } catch {
      return false;
    }
  }
}
