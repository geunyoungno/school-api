import { ISoftDeleteBaseSchema } from '#entities/interfaces/IBaseSchema';
import ISchoolSchema from '#entities/interfaces/ISchoolSchema';
import IUserSchema from '#entities/interfaces/IUserSchema';

export interface INewsFeedColumnSchema {
  /** 뉴스피드 id */
  id: number;

  /** 뉴스피드 제목 */
  title: string;

  /** 뉴스피드 내용 */
  content: string;

  /* 뉴스피드 개시한 유저 id */
  userId: number;

  /** 뉴스피드 개시하는 학교 id */
  schoolId: number;
}

export interface INewsFeedRelationSchema {
  user?: IUserSchema;

  school?: ISchoolSchema;
}

export default interface INewsFeedSchema
  extends INewsFeedColumnSchema,
    ISoftDeleteBaseSchema,
    INewsFeedRelationSchema {}
