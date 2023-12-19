import { CE_USER_TYPE, TUserType } from '#entities/interfaces/CE_USER_TYPE';
import IUserSchema from '#entities/interfaces/IUserSchema';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ResUserDto {
  @ApiProperty({
    description: '사용자 id',
    type: 'number',
  })
  @IsNumber()
  id: IUserSchema['id'];

  @ApiProperty({
    description: '사용자 명',
    type: 'string',
  })
  @IsString()
  name: IUserSchema['name'];

  @ApiProperty({
    description: '사용자 이메일',
    type: 'string',
  })
  @IsString()
  email: IUserSchema['email'];

  @ApiProperty({
    description: '사용자 종류',
    enum: [CE_USER_TYPE.ADMINISTRATOR, CE_USER_TYPE.STUDENT],
  })
  @IsEnum(CE_USER_TYPE)
  type: TUserType;

  constructor(args: IUserSchema) {
    this.id = args.id;
    this.name = args.name;
    this.email = args.email;
    this.type = args.type;
  }
}
