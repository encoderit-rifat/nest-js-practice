import { Injectable, ExecutionContext } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";


@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
      }
    
      canActivate(context: ExecutionContext) {
        // const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
        //   context.getHandler(),
        //   context.getClass(),
        // ]);
        // if (isPublic) {
        //   return true;
        // }
    
        // const request = context.switchToHttp().getRequest();
        // console.log('Auth Header:', request.headers.authorization);
        // console.log(':', super.canActivate(context));
    
        return super.canActivate(context);
      }
}