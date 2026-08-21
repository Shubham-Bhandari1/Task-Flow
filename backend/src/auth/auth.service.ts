import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Creates a brand-new guest user and immediately issues a JWT for it.
   * This is the entire "Guest Login" flow — no password, no email, one click.
   */
  async loginAsGuest() {
    const user = await this.usersService.createGuest();

    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      displayName: user.displayName,
      isGuest: user.isGuest,
    };

    return {
      accessToken: this.jwtService.sign(payload),
      user: this.toPublicUser(user),
    };
  }

  async me(userId: string) {
    const user = await this.usersService.findById(userId);
    return this.toPublicUser(user);
  }

  private toPublicUser(user: { id: string; username: string; displayName: string; isGuest: boolean }) {
    return {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      isGuest: user.isGuest,
    };
  }
}
