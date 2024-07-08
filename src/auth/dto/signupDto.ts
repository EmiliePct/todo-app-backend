import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly first_name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly surname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  readonly pwd: string;
}
