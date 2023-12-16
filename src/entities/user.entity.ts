import BaseEntity from '#entities/base.entity';
import IUserSchema, { IUserColumnSchema, IUserRelationSchema } from '#entities/interfaces/IUserSchema';
import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from 'typeorm';

const UserEntity = new EntitySchema<IUserSchema>({
  name: 'UserEntity',
  tableName: 'user',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
      comment: '사용자 id',
      name: 'id',
    },
    name: {
      type: 'varchar',
      length: 255,
      comment: '사용자 명',
      name: 'name',
    },
    email: {
      type: 'varchar',
      length: 255,
      comment: '사용자 이메일',
      name: 'email',
    },
    type: {
      type: 'varchar',
      length: 32,
      comment: '사용자 종류',
      // type이 예약어이기 때문에 prefix(user_)를 추가함
      name: 'user_type',
    },
    ...BaseEntity.columns,
  } satisfies Record<keyof IUserColumnSchema, EntitySchemaColumnOptions>,
  relations: {
    subscriptions: {
      type: 'one-to-many',
      target: 'SubscriptionEntity',
      inverseSide: 'user',
      createForeignKeyConstraints: false,
    },
  } satisfies Record<keyof IUserRelationSchema, EntitySchemaRelationOptions>,
});

export default UserEntity;
