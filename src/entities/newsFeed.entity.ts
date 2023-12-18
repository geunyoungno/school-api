import { SoftDeleteBaseEntity } from '#entities/base.entity';
import INewsFeedSchema, { INewsFeedColumnSchema, INewsFeedRelationSchema } from '#entities/interfaces/INewsFeedSchema';
import { EntitySchema, EntitySchemaColumnOptions, EntitySchemaRelationOptions } from 'typeorm';

const NewsFeedEntity = new EntitySchema<INewsFeedSchema>({
  name: 'NewsFeedEntity',
  tableName: 'news_feed',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: 'increment',
      comment: '뉴스피드 id',
      name: 'id',
    },
    title: {
      type: 'varchar',
      length: 255,
      comment: '뉴스피드 제목',
      name: 'title',
    },
    content: {
      type: 'text',
      comment: '뉴스피드 내용',
      name: 'email',
    },
    userId: {
      type: 'int',
      unsigned: true,
      comment: '뉴스피드 개시하는 학교 id',
      name: 'user_id',
    },
    schoolId: {
      type: 'int',
      unsigned: true,
      comment: '뉴스피드 개시하는 학교 id',
      name: 'school_id',
    },
    ...SoftDeleteBaseEntity.columns,
  } satisfies Record<keyof INewsFeedColumnSchema, EntitySchemaColumnOptions>,
  relations: {
    user: {
      type: 'many-to-one',
      target: 'UserEntity',
      inverseSide: 'newsFeeds',
      createForeignKeyConstraints: false,
      joinColumn: {
        name: 'user_id',
      },
    },
    school: {
      type: 'many-to-one',
      target: 'SchoolEntity',
      inverseSide: 'newsFeeds',
      createForeignKeyConstraints: false,
      joinColumn: {
        name: 'school_id',
      },
    },
  } satisfies Record<keyof INewsFeedRelationSchema, EntitySchemaRelationOptions>,
});

export default NewsFeedEntity;
