import ISubscriptionSchema from '#entities/interfaces/ISubscriptionSchema';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsISO8601, IsNumber } from 'class-validator';

export class ResSubscriptionDto {
  @ApiProperty({
    description: '구독 id',
    type: 'number',
  })
  @IsNumber()
  id: ISubscriptionSchema['id'];

  @ApiProperty({
    description: '구독 시점',
    type: 'string',
    format: 'date-time',
  })
  @IsISO8601()
  subscribedAt: string;

  @ApiProperty({
    description: '구독 취소 시점',
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  @IsISO8601()
  unsubscribedAt?: string;

  @ApiProperty({
    description: '구독 여부',
    type: 'boolean',
  })
  @IsBoolean()
  isSubscribed: ISubscriptionSchema['isSubscribed'];

  constructor(args: ISubscriptionSchema) {
    this.id = args.id;
    this.subscribedAt = args.subscribedAt.toISOString();
    this.unsubscribedAt = args?.unsubscribedAt.toISOString();
    this.isSubscribed = args.isSubscribed;
  }
}
