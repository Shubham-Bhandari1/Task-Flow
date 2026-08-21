export interface JwtPayload {
  sub: string;
  username: string;
  displayName: string;
  isGuest: boolean;
}
