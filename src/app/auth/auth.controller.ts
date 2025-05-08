import { Controller, Post, Body, UseGuards, Request, Get, UsePipes,ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthLoginDto } from './dto/auth.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() authLoginDto: AuthLoginDto) {
    console.log('Login attempt with email:', authLoginDto.email);
    return this.authService.validateUser(authLoginDto.email, authLoginDto.password).then(user => {
      return this.authService.login(user);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log('User profile request:', req.user);
    return req.user;
  }
}
