import getHeaderUserId from '#controllers/getHeaderUserId';
import { ReqDeleteNewsFeedHeaderDto, ReqDeleteNewsFeedParamDto } from '#dtos/ReqDeleteNewsFeedDto';
import { ReqGetNewsFeedsHeaderDto, ReqGetNewsFeedsParamDto } from '#dtos/ReqGetNewsFeedsDto';
import {
  ReqPatchNewsFeedBodyDto,
  ReqPatchNewsFeedHeaderDto,
  ReqPatchNewsFeedParamDto,
} from '#dtos/ReqPatchNewsFeedDto';
import { ReqPostNewsFeedBodyDto, ReqPostNewsFeedHeaderDto, ReqPostNewsFeedParamDto } from '#dtos/ReqPostNewsFeedDto';
import { ResNewsFeedDto } from '#dtos/ResNewsFeedDto';
import { NewsFeedService } from '#services/newsFeed.service';
import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

const tag = 'newsFeeds';

@Controller()
export class NewsFeedController {
  constructor(private readonly newsFeedService: NewsFeedService) {}

  @ApiOperation({
    summary: `뉴스피드 생성`,
    description: '학교 관리자는 학교 페이지 내에 소식을 작성할 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '뉴스피드 단건',
    type: ResNewsFeedDto,
    isArray: false,
  })
  @Post('schoolds/:schoolId/news-feeds')
  async postNewsFeed(
    @Headers() headers: ReqPostNewsFeedHeaderDto,
    @Param() param: ReqPostNewsFeedParamDto,
    @Body() body: ReqPostNewsFeedBodyDto,
  ): Promise<ResNewsFeedDto> {
    const newsFeed = await this.newsFeedService.create({
      userId: getHeaderUserId(headers),
      newsFeed: {
        title: body.title,
        content: body.content,
        schoolId: param.schoolId,
      },
    });

    return new ResNewsFeedDto(newsFeed);
  }

  @ApiOperation({
    summary: `뉴스피드 수정`,
    description: '학교 관리자는 작성된 소식을 수정할 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '뉴스피드 단건',
    type: ResNewsFeedDto,
    isArray: false,
  })
  @Patch('schoolds/:schoolId/news-feeds/:newsFeedId')
  async patchNewsFeed(
    @Headers() headers: ReqPatchNewsFeedHeaderDto,
    @Param() param: ReqPatchNewsFeedParamDto,
    @Body() body: ReqPatchNewsFeedBodyDto,
  ): Promise<ResNewsFeedDto> {
    const newsFeed = await this.newsFeedService.update({
      userId: getHeaderUserId(headers),
      newsFeed: {
        id: param.newsFeedId,
        schoolId: param.schoolId,
        title: body.title,
        content: body.content,
      },
    });

    return new ResNewsFeedDto(newsFeed);
  }

  @ApiOperation({
    summary: `뉴스피드 삭제`,
    description: '학교 관리자는 작성된 소식을 삭제할 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '뉴스피드 단건',
    type: ResNewsFeedDto,
    isArray: false,
  })
  @Delete('schoolds/:schoolId/news-feeds/:newsFeedId')
  async deleteNewsFeed(
    @Headers() headers: ReqDeleteNewsFeedHeaderDto,
    @Param() param: ReqDeleteNewsFeedParamDto,
  ): Promise<ResNewsFeedDto> {
    const newsFeed = await this.newsFeedService.softDelete({
      userId: getHeaderUserId(headers),
      newsFeed: {
        id: param.newsFeedId,
        schoolId: param.schoolId,
      },
    });

    return new ResNewsFeedDto(newsFeed);
  }

  @ApiOperation({
    summary: `뉴스피드 목록 조회`,
    description: '학생은 구독 중인 학교 페이지별 소식을 볼 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '뉴스피드 목록',
    type: ResNewsFeedDto,
    isArray: true,
  })
  @Get('schoolds/:schoolId/news-feeds')
  async getNewsFeeds(
    @Headers() headers: ReqGetNewsFeedsHeaderDto,
    @Param() param: ReqGetNewsFeedsParamDto,
  ): Promise<Array<ResNewsFeedDto>> {
    const newsFeedds = await this.newsFeedService.readsBySchoolAndStudent({
      userId: getHeaderUserId(headers),
      newsFeed: {
        schoolId: param.schoolId,
      },
    });

    return newsFeedds.map((newsFeed) => new ResNewsFeedDto(newsFeed));
  }
}
