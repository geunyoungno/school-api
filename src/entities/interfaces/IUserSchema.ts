import { TUserType } from '#entities/interfaces/CE_USER_TYPE';
import IAuthorizationSchema from '#entities/interfaces/IAuthorizationSchema';
import { IBaseSchema } from '#entities/interfaces/IBaseSchema';
import INewsFeedSchema from '#entities/interfaces/INewsFeedSchema';
import ISubscriptionSchema from '#entities/interfaces/ISubscriptionSchema';

export interface IUserColumnSchema {
  /** 사용자 id */
  id: number;

  /** 사용자 명 */
  name: string;

  /** 사용자 이메일 */
  email: string;

  /** 사용자 종류 */
  type: TUserType;
}

export interface IUserRelationSchema {
  subscriptions?: ISubscriptionSchema[];

  authorizations?: IAuthorizationSchema[];

  newsFeeds?: INewsFeedSchema[];
}

export default interface IUserSchema extends IUserColumnSchema, IBaseSchema, IUserRelationSchema {}
