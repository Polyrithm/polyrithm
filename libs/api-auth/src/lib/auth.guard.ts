import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard as JwtAuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard extends JwtAuthGuard('jwt') {
  public constructor(private readonly reflector: Reflector, type?: string | string[]) {
    super(type)
  }
  public canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isHandlerPublic = this.reflector.get<boolean>("isPublic", context.getHandler());

    const isControllerPublic = this.reflector.get<boolean>("isPublic", context.getClass());

    if (isHandlerPublic || isControllerPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
