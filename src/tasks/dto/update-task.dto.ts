import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateTaskDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  is_done: boolean;
}
