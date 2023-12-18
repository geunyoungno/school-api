import { ReqUserHeaderDto } from '#dtos/ReqUserHeaderDto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ReqPostSchoolHeaderDto extends ReqUserHeaderDto {}

export class ReqPostSchoolParamDto {}

export class ReqPostSchoolBodyDto {
  @ApiProperty({
    description: '학교 명',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: '학교 위치',
  })
  @IsString()
  location!: string;
}
