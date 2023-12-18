import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ReqPatchNewsFeedHeaderDto extends ReqUserHeaderDto {}

export class ReqPatchNewsFeedParamDto {
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

export class ReqPatchNewsFeedBodyDto {
  @ApiProperty({
    description: '뉴스 피드 제목',
  })
  @IsString()
  title?: string;

  @ApiProperty({
    description: '뉴스 피드 내용',
  })
  @IsString()
  content?: string;
}
