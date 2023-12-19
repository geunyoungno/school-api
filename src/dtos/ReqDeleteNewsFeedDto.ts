import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqDeleteNewsFeedHeaderDto extends ReqUserHeaderDto {}

export class ReqDeleteNewsFeedParamDto {
  @ApiProperty({
    description: '학교 id',
    type: 'number',
  })
  @IsNumber()
  schoolId!: number;

  @ApiProperty({
    description: '뉴스피드 id',
    type: 'number',
  })
  @IsNumber()
  newsFeedId!: number;
}
