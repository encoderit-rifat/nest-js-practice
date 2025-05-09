import {
    PureAbility,
    AbilityBuilder,
    AbilityClass,
    ExtractSubjectType,
    InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../users/schemas/user.schema';

type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
type Subjects = InferSubjects<any> | 'all';
export type AppAbility = PureAbility<[Actions, Subjects]>;

@Injectable()
export class CaslAbilityFactory {

    async createForUser(user: User) {
        const { can, cannot, build } = new AbilityBuilder<PureAbility<[Actions, Subjects]>>(
            PureAbility as AbilityClass<AppAbility>,
        );

        console.log('createForUser', user.is_admin);
        if (user.is_admin) {
            console.log('admin', user);
            cannot('manage', 'all'); // Admin can manage everything
        } else {
            can('read', 'User');
            cannot('delete', 'User');
        }

        return build({
            detectSubjectType: (item) => item.constructor as ExtractSubjectType<Subjects>,
        });
    }

}