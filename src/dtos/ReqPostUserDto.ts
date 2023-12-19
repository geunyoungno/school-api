import { CE_USER_TYPE, TUserType } from '#entities/interfaces/CE_USER_TYPE';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export class ReqPostUserBodyDto {
  @ApiProperty({
    description: '사용자 명',
    type: 'string',
  })
  @IsString()
  name!: string;

  @ApiProperty({
    description: '사용자 이메일',
    type: 'string',
  })
  @IsString()
  email!: string;

  @ApiProperty({
    description: '사용자 종류',
    default: CE_USER_TYPE.ADMINISTRATOR,
    enum: [CE_USER_TYPE.ADMINISTRATOR, CE_USER_TYPE.STUDENT],
  })
  @IsEnum(CE_USER_TYPE)
  type!: TUserType;
}
