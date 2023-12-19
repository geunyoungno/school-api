import getHeaderUserId from '#controllers/getHeaderUserId';
import {
  ReqPatchUnsubscribeSubscriptionHeaderDto,
  ReqPatchUnsubscribeSubscriptionParamDto,
} from '#dtos/ReqPatchUnsubscribeSubscriptionDto';
import {
  ReqPostSubscribeSubscriptionHeaderDto,
  ReqPostSubscribeSubscriptionParamDto,
} from '#dtos/ReqPostSubscribeSubscriptionDto';
import { ResSubscriptionDto } from '#dtos/ResSubscriptionDto';
import { SubscriptionService } from '#services/subscription.service';
import { Controller, Headers, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

const tag = 'subscriptions';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({
    summary: `학교 구독`,
    description: '학생은 학교 페이지를 구독할 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '구독 단건',
    type: ResSubscriptionDto,
    isArray: false,
  })
  @Post('schoolds/:schoolId/subscriptions/subscribe')
  async postSubscription(
    @Headers() headers: ReqPostSubscribeSubscriptionHeaderDto,
    @Param() param: ReqPostSubscribeSubscriptionParamDto,
  ): Promise<ResSubscriptionDto> {
    const subscription = await this.subscriptionService.subscribe({
      userId: getHeaderUserId(headers),
      subscription: {
        schoolId: param.schoolId,
      },
    });

    return new ResSubscriptionDto(subscription);
  }

  @ApiOperation({
    summary: `학교 구독 취소`,
    description: '학생은 구독 중인 학교 페이지를 구독 취소할 수 있다',
    tags: [tag],
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: '구독 단건',
    type: ResSubscriptionDto,
    isArray: false,
  })
  @Patch('schoolds/:schoolId/subscriptions/:subscriptionId/unsubscribe')
  async patchSubscription(
    @Headers() headers: ReqPatchUnsubscribeSubscriptionHeaderDto,
    @Param() param: ReqPatchUnsubscribeSubscriptionParamDto,
  ): Promise<ResSubscriptionDto> {
    const subscription = await this.subscriptionService.unsubscribe({
      userId: getHeaderUserId(headers),
      subscription: {
        id: param.subscriptionId,
        schoolId: param.schoolId,
      },
    });

    return new ResSubscriptionDto(subscription);
  }
}
