import { ReqPostSchoolBodyDto, ReqPostSchoolHeaderDto } from '#dtos/ReqPostSchoolDto';
import { ResSchoolDto } from '#dtos/ResSchoolDto';
import { SchoolService } from '#services/school.service';
import { Body, Controller, Headers, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

const tag = 'schools';

@Controller()
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @ApiOperation({
    summary: `학교 생성`,
    description: '학교 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '학교 단건',
    type: ResSchoolDto,
    isArray: false,
  })
  @Post('schools')
  async postSchool(
    @Headers() headers: ReqPostSchoolHeaderDto,
    @Body() body: ReqPostSchoolBodyDto,
  ): Promise<ResSchoolDto> {
    const school = await this.schoolService.create({
      userId: headers.userId,
      school: {
        name: body.name,
        location: body.location,
      },
    });

    return new ResSchoolDto(school);
  }
}
