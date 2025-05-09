// policies.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl.factory';
import {
  CHECK_POLICIES_KEY,
  PolicyHandler,
  // IPolicyHandler,
} from './policy.decorator';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ability = await this.caslAbilityFactory.createForUser(user);

    return policyHandlers.every((handler) => {
      if (typeof handler === 'function') {
        return handler(ability);
      }

      // return (handler as IPolicyHandler).handle(ability);
      return handler.handle(ability);
    });
  }
}