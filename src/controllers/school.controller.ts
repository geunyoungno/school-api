import { ReqGetSchoolsHeaderDto } from '#dtos/ReqGetSchoolsDto';
import { ReqPostSchoolBodyDto, ReqPostSchoolHeaderDto } from '#dtos/ReqPostSchoolDto';
import { ResSchoolDto } from '#dtos/ResSchoolDto';
import { SchoolService } from '#services/school.service';
import { Body, Controller, Get, Headers, HttpStatus, Post } from '@nestjs/common';
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

  @ApiOperation({
    summary: `학교 목록 조회`,
    description: '학생은 구독 중인 학교 페이지 목록을 확인할 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '학교 목록',
    type: ResSchoolDto,
    isArray: true,
  })
  @Get('schools')
  async getSchools(
    @Headers() headers: ReqGetSchoolsHeaderDto,
    // @Param() param: ReqGetSchoolsParamDto
  ): Promise<Array<ResSchoolDto>> {
    const schoolds = await this.schoolService.readsByStudent({
      userId: headers.userId,
    });

    return schoolds.map((school) => new ResSchoolDto(school));
  }
}
