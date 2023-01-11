import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const user = {
      name: 'kamal',
      roles: 'customer'
    };
    const requiredRole = 'admin';
    if (!user.roles.includes(requiredRole)) {
      // throw new UnauthorizedException('Unauthorized');
      return false;
    }
    return true;
  }
}
