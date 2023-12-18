import ISchoolSchema from '#entities/interfaces/ISchoolSchema';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class ResSchoolDto {
  @ApiProperty({
    description: '학교 id',
  })
  @IsNumber()
  id: ISchoolSchema['id'];

  @ApiProperty({
    description: '학교 명',
  })
  @IsString()
  name: ISchoolSchema['name'];

  @ApiProperty({
    description: '학교 위치',
  })
  @IsString()
  location: ISchoolSchema['location'];

  constructor(args: ISchoolSchema) {
    this.id = args.id;
    this.name = args.name;
    this.location = args.location;
  }
}
