import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Drop this on any controller/route with @UseGuards(JwtAuthGuard) to require
 * a valid bearer token. On failure it automatically throws a 401.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
