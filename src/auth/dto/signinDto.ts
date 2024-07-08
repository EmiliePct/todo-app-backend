import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly pwd: string;
}
