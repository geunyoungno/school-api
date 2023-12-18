import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class ReqDeleteNewsFeedHeaderDto extends ReqUserHeaderDto {}

export class ReqDeleteNewsFeedParamDto {
  @ApiProperty({
    description: '학교 id',
  })
  @IsNumber()
  schoolId!: number;

  @ApiProperty({
    description: '뉴스피드 id',
  })
  @IsNumber()
  newsFeedId!: number;
}
