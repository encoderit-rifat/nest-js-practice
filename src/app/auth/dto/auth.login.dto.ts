import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
    constructor() {
        console.log('AuthLoginDto constructor called');
    }
    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsString({ message: 'Password must be a string' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}