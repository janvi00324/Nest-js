import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRles) {
      return true;
    }
    const { user }: any = context.switchToHttp().getRequest();
    if (!user || !requiredRles.includes(user?.role)) {
      throw new ForbiddenException(
        `Access denied: your role '${user?.role}' does not have permission to access this resource.`,
      );
    }
    return true;
  }
}
