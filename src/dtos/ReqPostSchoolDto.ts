import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqPostSchoolHeaderDto extends ReqUserHeaderDto {}

export class ReqPostSchoolParamDto {}

export class ReqPostSchoolBodyDto {
  @ApiProperty({
    description: '학교 명',
    type: 'string',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: '학교 위치',
    type: 'string',
  })
  @IsString()
  location!: string;
}
