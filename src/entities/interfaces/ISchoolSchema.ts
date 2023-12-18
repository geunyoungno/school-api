import IAuthorizationSchema from '#entities/interfaces/IAuthorizationSchema';
import { IBaseSchema } from '#entities/interfaces/IBaseSchema';
import INewsFeedSchema from '#entities/interfaces/INewsFeedSchema';
import ISubscriptionSchema from '#entities/interfaces/ISubscriptionSchema';

export interface ISchoolColumnSchema {
  /** 학교 id */
  id: number;

  /**
   * 학교 명
   */
  name: string;

  /**
   * 학교 위치
   */
  location: string;
}

export interface ISchoolRelationSchema {
  newsFeeds?: INewsFeedSchema[];

  subscriptions?: ISubscriptionSchema[];

  authorizations?: IAuthorizationSchema[];
}

export default interface ISchoolSchema extends ISchoolColumnSchema, IBaseSchema, ISchoolRelationSchema {}
