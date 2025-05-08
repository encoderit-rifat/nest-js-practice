import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtModule } from '@nestjs/jwt';

// JwtModule.register({
//   secret: process.env.JWT_SECRET,
//   signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
// });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "defaultSecretKey",
        });
    }

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}