import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReqPatchNewsFeedHeaderDto extends ReqUserHeaderDto {}

export class ReqPatchNewsFeedParamDto {
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

export class ReqPatchNewsFeedBodyDto {
  @ApiProperty({
    description: '뉴스 피드 제목',
    type: 'string',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '뉴스 피드 내용',
    type: 'string',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  content?: string;
}
