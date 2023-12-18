import { TAuthorizationRole } from '#entities/interfaces/CE_AUTHORIZATION_ROLE';
import { TAuthorizationTarget } from '#entities/interfaces/CE_AUTHORIZATION_TARGET';
import { ISoftDeleteBaseSchema } from '#entities/interfaces/IBaseSchema';
import ISchoolSchema from '#entities/interfaces/ISchoolSchema';
import IUserSchema from '#entities/interfaces/IUserSchema';

export interface IAuthorizationColumnSchema {
  /** 인가 id */
  id: number;

  /** 사용자 id */
  userId: number;

  /** 역활 */
  role: TAuthorizationRole;

  /** 대상 */
  target: TAuthorizationTarget;

  /** 대상 id */
  targetId: number;
}

export interface IAuthorizationRelationSchema {
  user?: IUserSchema;

  school?: ISchoolSchema;
}

export default interface IAuthorizationSchema
  extends IAuthorizationColumnSchema,
    ISoftDeleteBaseSchema,
    IAuthorizationRelationSchema {}
