import BaseEntity from '#entities/base.entity';
import ISubscriptionSchema, {
  ISubscriptionColumnSchema,
  ISubscriptionRelationSchema,
} from '#entities/interfaces/ISubscriptionSchema';
import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from 'typeorm';

const SubscriptionEntity = new EntitySchema<ISubscriptionSchema>({
  name: 'SubscriptionEntity',
  tableName: 'subscription',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
      comment: '학교 id',
      name: 'id',
    },
    userId: {
      type: 'int',
      unsigned: true,
      comment: '사용자 id',
      name: 'user_id',
    },
    schoolId: {
      type: 'int',
      unsigned: true,
      comment: '학교 id',
      name: 'school_id',
    },
    subscribedAt: {
      type: 'datetime',
      comment: '구독 시점',
      name: 'subscribed_at',
    },
    unsubscribedAt: {
      type: 'datetime',
      comment: '구독 취소 시점',
      nullable: true,
      name: 'unsubscribed_at',
    },
    isSubscribed: {
      type: 'boolean',
      comment: '구독 여부',
      default: true,
      name: 'is_subscribed',
    },
    ...BaseEntity.columns,
  } satisfies Record<keyof ISubscriptionColumnSchema, EntitySchemaColumnOptions>,
  relations: {
    user: {
      type: 'many-to-one',
      target: 'UserEntity',
      inverseSide: 'subscriptions',
      createForeignKeyConstraints: false,
      joinColumn: {
        name: 'user_id',
      },
    },
    school: {
      type: 'many-to-one',
      target: 'SchoolEntity',
      inverseSide: 'subscriptions',
      createForeignKeyConstraints: false,
      joinColumn: {
        name: 'school_id',
      },
    },
  } satisfies Record<keyof ISubscriptionRelationSchema, EntitySchemaRelationOptions>,
});

export default SubscriptionEntity;
