import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  name: string;

  @IsOptional()
  @IsString()
  color?: string; // hex string, e.g. "#4C5FD5" — shown as a small dot in the UI
}
