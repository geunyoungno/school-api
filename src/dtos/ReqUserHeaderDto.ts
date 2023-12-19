import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqUserHeaderDto {
  @ApiProperty({
    description: '사용자 id',
    type: 'number',
  })
  @IsNumber()
  userId!: number;
}
