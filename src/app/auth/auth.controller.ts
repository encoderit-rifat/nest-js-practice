import { Controller, Post, Body, UseGuards, Request, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthLoginDto } from './dto/auth.login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.validateUser(authLoginDto.email, authLoginDto.password).then(user => {
      return this.authService.login(user);
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req) {
    return { message: 'Logged out successfully' };
  }
}
