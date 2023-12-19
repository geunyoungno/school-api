import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqPostSubscribeSubscriptionHeaderDto extends ReqUserHeaderDto {}

export class ReqPostSubscribeSubscriptionParamDto {
  @ApiProperty({
    description: '학교 id',
    type: 'number',
  })
  @IsNumber()
  schoolId!: number;
}
