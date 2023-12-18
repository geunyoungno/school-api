import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqPatchUnsubscribeSubscriptionHeaderDto extends ReqUserHeaderDto {}

export class ReqPatchUnsubscribeSubscriptionParamDto {
  @ApiProperty({
    description: '학교 id',
  })
  @IsNumber()
  schoolId!: number;

  @ApiProperty({
    description: '구독 id',
  })
  @IsNumber()
  subscriptionId!: number;
}
