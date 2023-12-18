import { SoftDeleteBaseEntity } from '#entities/base.entity';
import { CE_AUTHORIZATION_ROLE } from '#entities/interfaces/CE_AUTHORIZATION_ROLE';
import { CE_AUTHORIZATION_TARGET } from '#entities/interfaces/CE_AUTHORIZATION_TARGET';
import IAuthorizationSchema, {
  IAuthorizationColumnSchema,
  IAuthorizationRelationSchema,
} from '#entities/interfaces/IAuthorizationSchema';
import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from 'typeorm';

const AuthorizationEntity = new EntitySchema<IAuthorizationSchema>({
  name: 'AuthorizationEntity',
  tableName: 'authorization',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
      comment: '인가 id',
      name: 'id',
    },
    userId: {
      type: 'int',
      unsigned: true,
      comment: '사용자 id',
      name: 'user_id',
    },
    role: {
      type: 'varchar',
      length: 32,
      default: CE_AUTHORIZATION_ROLE.STUDENT,
      comment: '역활',
      // role이 예약어이기 때문에 prefix(authorization_)를 추가함
      name: 'authorization_role',
    },
    target: {
      type: 'varchar',
      length: 32,
      default: CE_AUTHORIZATION_TARGET.SCHOOL,
      comment: '대상',
      name: 'target',
    },
    targetId: {
      type: 'int',
      unsigned: true,
      comment: '대상 id',
      name: 'target_id',
    },
    ...SoftDeleteBaseEntity.columns,
  } satisfies Record<keyof IAuthorizationColumnSchema, EntitySchemaColumnOptions>,
  relations: {
    user: {
      type: 'many-to-one',
      target: 'UserEntity',
      inverseSide: 'authorizations',
      createForeignKeyConstraints: false,
      joinColumn: {
        name: 'user_id',
      },
    },
    school: {
      type: 'many-to-one',
      target: 'SchoolEntity',
      inverseSide: 'authorizations',
      createForeignKeyConstraints: false,
      joinColumn: {
        name: 'school_id',
      },
    },
  } satisfies Record<keyof IAuthorizationRelationSchema, EntitySchemaRelationOptions>,
});

export default AuthorizationEntity;
