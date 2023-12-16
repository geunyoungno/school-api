import BaseEntity from '#entities/base.entity';
import ISchoolSchema, { ISchoolColumnSchema, ISchoolRelationSchema } from '#entities/interfaces/ISchoolSchema';
import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from 'typeorm';

const SchoolEntity = new EntitySchema<ISchoolSchema>({
  name: 'SchoolEntity',
  tableName: 'school',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
      comment: '학교 id',
      name: 'id',
    },
    name: {
      type: 'varchar',
      length: 255,
      comment: '학교 명',
      name: 'name',
    },
    location: {
      type: 'varchar',
      length: 255,
      comment: '학교 위치',
      name: 'location',
    },
    ...BaseEntity.columns,
  } satisfies Record<keyof ISchoolColumnSchema, EntitySchemaColumnOptions>,
  relations: {
    newsFeeds: {
      type: 'one-to-many',
      target: 'NewsFeedEntity',
      inverseSide: 'school',
      createForeignKeyConstraints: false,
    },
    subscriptions: {
      type: 'one-to-many',
      target: 'SubscriptionEntity',
      inverseSide: 'school',
      createForeignKeyConstraints: false,
    },
  } satisfies Record<keyof ISchoolRelationSchema, EntitySchemaRelationOptions>,
});

export default SchoolEntity;
