import { Controller, Post, Get, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { JwtPayload } from './jwt-payload.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /api/auth/guest — this is the entire "Guest Login" feature.
  // No form, no password: create a throwaway user and hand back a token.
  @Post('guest')
  @HttpCode(200) // POST defaults to 201 Created; 200 fits better since we're not "creating a resource" from the client's point of view
  loginAsGuest() {
    return this.authService.loginAsGuest();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile(@CurrentUser() user: JwtPayload) {
    return this.authService.me(user.sub);
  }
}
