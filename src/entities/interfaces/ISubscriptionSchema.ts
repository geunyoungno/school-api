import { IBaseSchema } from '#entities/interfaces/IBaseSchema';
import ISchoolSchema from '#entities/interfaces/ISchoolSchema';
import IUserSchema from '#entities/interfaces/IUserSchema';

export interface ISubscriptionColumnSchema {
  /** 구독 id */
  id: number;

  /** 사용자 id */
  userId: number;

  /** 학교 id */
  schoolId: number;

  /** 구독 시점 */
  subscribedAt: Date;

  /** 구독 취소 시점 */
  unsubscribedAt?: Date;

  /** 구독 여부 */
  isSubscribed: boolean;
}

export interface ISubscriptionRelationSchema {
  user?: IUserSchema;

  school?: ISchoolSchema;
}

export default interface ISubscriptionSchema
  extends ISubscriptionColumnSchema,
    IBaseSchema,
    ISubscriptionRelationSchema {}
