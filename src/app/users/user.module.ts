import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CaslModule } from '../casl/casl.module';

@Module({

    imports: [
        CaslModule,
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
        ]),
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService, MongooseModule],
})

export class UserModule {
    constructor() {
        // console.log('UserModule import...' + User.name);
    }
}