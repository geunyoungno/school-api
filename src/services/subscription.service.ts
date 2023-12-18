import { CE_USER_TYPE } from '#entities/interfaces/CE_USER_TYPE';
import ISubscriptionSchema from '#entities/interfaces/ISubscriptionSchema';
import IUserSchema from '#entities/interfaces/IUserSchema';
import { SubscriptionRepository } from '#repositories/subscription.repository';
import { UserRepository } from '#repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async isStudent(args: { userId: IUserSchema['id'] }) {
    const user = await this.userRepository.select(args.userId);
    if (user.type !== CE_USER_TYPE.STUDENT) {
      throw new HttpException('user not student', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  /**
   * 학생은 학교 페이지를 구독할 수 있다
   */
  async subscribe(args: {
    userId: IUserSchema['id'];
    subscription: Pick<ISubscriptionSchema, 'schoolId'>;
  }): Promise<ISubscriptionSchema> {
    // stage 1: 사용자 확인
    const user = await this.isStudent({ userId: args.userId });

    // stage 2: 이미 구독된 학교인지 검증
    const subscription = await (async (): Promise<ISubscriptionSchema | undefined> => {
      try {
        return await this.subscriptionRepository.selectWhereUserAndSchool({
          userId: user.id,
          schoolId: args.subscription.schoolId,
        });
      } catch (catched) {
        if (catched instanceof HttpException && catched.getStatus() === HttpStatus.NOT_FOUND) {
          return undefined;
        }

        throw catched;
      }
    })();

    if (subscription != null) {
      throw new HttpException('subscription already exist', HttpStatus.BAD_REQUEST);
    }

    // stage 3: 구독 추가
    const beforeSubscriptionSchema = {
      userId: user.id,
      schoolId: args.subscription.schoolId,
      subscribedAt: new Date(),
      isSubscribed: true,
    } satisfies Pick<ISubscriptionSchema, 'userId' | 'schoolId' | 'subscribedAt' | 'isSubscribed'>;

    const { subscriptionId } = await this.subscriptionRepository.insertSubscription(beforeSubscriptionSchema);

    const subscriptionEntity = await this.subscriptionRepository.select(subscriptionId);

    return subscriptionEntity;
  }

  /**
   * 학생은 구독 중인 학교 페이지를 구독 취소할 수 있다
   */
  async unsubscribe(args: {
    userId: IUserSchema['id'];
    subscription: Pick<ISubscriptionSchema, 'id' | 'schoolId'>;
  }): Promise<ISubscriptionSchema> {
    // stage 1: 사용자 확인
    await this.isStudent({ userId: args.userId });

    // stage 2: 이미 구독된 학교인지 검증
    const subscription = await this.subscriptionRepository.select(args.subscription.id);

    if (subscription.isSubscribed !== true) {
      throw new HttpException('subscription already unsubscribe', HttpStatus.BAD_REQUEST);
    }

    // stage 3: 구독 취소 처리
    const beforeSubscriptionSchema = {
      id: subscription.id,
      unsubscribedAt: new Date(),
      isSubscribed: false,
    } satisfies Pick<ISubscriptionSchema, 'id' | 'unsubscribedAt' | 'isSubscribed'>;

    await this.subscriptionRepository.update(beforeSubscriptionSchema);

    const subscriptionEntity = await this.subscriptionRepository.select(args.subscription.id);

    return subscriptionEntity;
  }
}
