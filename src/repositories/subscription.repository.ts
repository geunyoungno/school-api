import getInsertResultId from '#entities/getInsertResultId';
import ISubscriptionSchema from '#entities/interfaces/ISubscriptionSchema';
import { TConn } from '#entities/interfaces/TConn';
import SubscriptionEntity from '#entities/subscription.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SubscriptionRepository {
  constructor(private dataSource: DataSource) {}

  async insertSubscription(
    subscription: Pick<ISubscriptionSchema, 'userId' | 'schoolId' | 'subscribedAt' | 'isSubscribed'>,
    conn: TConn = this.dataSource,
  ): Promise<{ subscriptionId: ISubscriptionSchema['id'] }> {
    const beforeSubscriptionSchema = {
      userId: subscription.userId,
      schoolId: subscription.schoolId,
      subscribedAt: subscription.subscribedAt,
      isSubscribed: subscription.isSubscribed ?? true,
    } satisfies Pick<ISubscriptionSchema, 'userId' | 'schoolId' | 'subscribedAt' | 'isSubscribed'>;

    const subscriptionResult = await conn
      .getRepository(SubscriptionEntity)
      .createQueryBuilder()
      .insert()
      .values(beforeSubscriptionSchema)
      .updateEntity(false)
      .execute();

    const subscriptionId = getInsertResultId(subscriptionResult);

    return {
      subscriptionId,
    };
  }

  async update(
    subscription: Pick<ISubscriptionSchema, 'id' | 'unsubscribedAt' | 'isSubscribed'>,
    conn: TConn = this.dataSource,
  ): Promise<{
    subscriptionId: ISubscriptionSchema['id'];
  }> {
    const subscriptionId = subscription.id;

    const beforeSubscriptionSchema = {
      unsubscribedAt: subscription.unsubscribedAt,
      isSubscribed: subscription.isSubscribed,
    } satisfies Pick<ISubscriptionSchema, 'unsubscribedAt' | 'isSubscribed'>;

    await conn
      .getRepository(SubscriptionEntity)
      .createQueryBuilder()
      .update()
      .set(beforeSubscriptionSchema)
      .where('id = :subscriptionId', { subscriptionId })
      .updateEntity(false)
      .execute();

    return {
      subscriptionId,
    };
  }

  async select(subscriptionId: ISubscriptionSchema['id'], conn: TConn = this.dataSource): Promise<ISubscriptionSchema> {
    const subscriptionEntity = await conn
      .getRepository(SubscriptionEntity)
      .createQueryBuilder()
      .where(`id = :subscriptionId`, { subscriptionId })
      .orderBy(`id`, 'DESC')
      .getOne();

    if (subscriptionEntity == null) {
      throw new HttpException('subscription not found', HttpStatus.NOT_FOUND);
    }

    return subscriptionEntity;
  }

  async selectWhereUserAndSchool(
    subscription: Pick<ISubscriptionSchema, 'userId' | 'schoolId'>,
    conn: TConn = this.dataSource,
  ) {
    const subscriptionEntity = await conn
      .getRepository(SubscriptionEntity)
      .createQueryBuilder()
      .where(`user_id = :userId`, { userId: subscription.userId })
      .andWhere(`school_id = :schoolId`, { schoolId: subscription.schoolId })
      .andWhere('is_subscribed = :isSubscribed', { isSubscribed: true })
      .orderBy('id', 'DESC')
      .getOne();

    if (subscriptionEntity == null) {
      throw new HttpException('subscription not found', HttpStatus.NOT_FOUND);
    }

    return subscriptionEntity;
  }

  async selectsWhereUser(
    userId: ISubscriptionSchema['userId'],
    conn: TConn = this.dataSource,
  ): Promise<Array<ISubscriptionSchema>> {
    const subscriptionEntities = await conn
      .getRepository(SubscriptionEntity)
      .createQueryBuilder()
      .where(`user_id = :userId`, { userId: userId })
      .andWhere('is_subscribed = :isSubscribed', { isSubscribed: true })
      .leftJoinAndSelect(`school`, 'sch_as')
      .orderBy('id', 'DESC')
      .getMany();

    return subscriptionEntities;
  }
}
