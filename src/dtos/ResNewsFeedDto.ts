import INewsFeedSchema from '#entities/interfaces/INewsFeedSchema';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ResNewsFeedDto {
  @ApiProperty({
    description: '뉴스피드 id',
  })
  @IsNumber()
  id: INewsFeedSchema['id'];

  @ApiProperty({
    description: '뉴스피드 제목',
  })
  @IsString()
  title: INewsFeedSchema['title'];

  @ApiProperty({
    description: '뉴스피드 내용',
  })
  @IsString()
  content: INewsFeedSchema['content'];

  constructor(args: INewsFeedSchema) {
    this.id = args.id;
    this.title = args.title;
    this.content = args.content;
  }
}
