import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReqPostNewsFeedHeaderDto extends ReqUserHeaderDto {}

export class ReqPostNewsFeedParamDto {
  @ApiProperty({
    description: '학교 id',
    type: 'number',
  })
  @IsNumber()
  schoolId!: number;
}

export class ReqPostNewsFeedBodyDto {
  @ApiProperty({
    description: '뉴스피드 제목',
    type: 'string',
  })
  @IsString()
  title!: string;

  @ApiProperty({
    description: '뉴스피드 내용',
    type: 'string',
  })
  @IsString()
  content!: string;
}
