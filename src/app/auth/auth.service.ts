import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        try {
            const user = await this.userService.findByEmail(email);
            if (user && (await bcrypt.compare(password, user.password))) {
                const { password, ...result } = user;
                return result;
            }
            throw new UnauthorizedException('Invalid credentials');
        } catch (error) {
            throw error;
        }
    }
    async login(user: any) {
        const payload = { email: user._doc.email, sub: user._doc._id };
        return {
            data: user._doc,
            access_token: this.jwtService.sign(payload),
        };
    }

}
