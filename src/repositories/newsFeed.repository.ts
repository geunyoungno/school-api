import getInsertResultId from '#entities/getInsertResultId';
import INewsFeedSchema from '#entities/interfaces/INewsFeedSchema';
import { TConn } from '#entities/interfaces/TConn';
import NewsFeedEntity from '#entities/newsFeed.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class NewsFeedRepository {
  constructor(private dataSource: DataSource) {}

  async insert(
    newsFeed: Pick<INewsFeedSchema, 'title' | 'content' | 'userId' | 'schoolId'>,
    conn: TConn = this.dataSource,
  ): Promise<{
    newsFeedId: INewsFeedSchema['id'];
  }> {
    const beforeNewsFeedSchema = {
      title: newsFeed.title,
      content: newsFeed.content,
      userId: newsFeed.userId,
      schoolId: newsFeed.schoolId,
    } satisfies Pick<INewsFeedSchema, 'title' | 'content' | 'userId' | 'schoolId'>;

    const newsFeedResult = await conn
      .getRepository(NewsFeedEntity)
      .createQueryBuilder()
      .insert()
      .values(beforeNewsFeedSchema)
      .updateEntity(false)
      .execute();

    const newsFeedId = getInsertResultId(newsFeedResult);

    return {
      newsFeedId,
    };
  }

  async select(newsFeedId: INewsFeedSchema['id'], conn: TConn = this.dataSource): Promise<INewsFeedSchema> {
    const newsFeedEntity = await conn
      .getRepository(NewsFeedEntity)
      .createQueryBuilder()
      .where(`id = :newsFeedId`, { newsFeedId })
      .andWhere(`is_deleted = :isDeleted`, { isDeleted: false })
      .orderBy(`id`, 'DESC')
      .getOne();

    if (newsFeedEntity == null) {
      throw new HttpException('newsFeed not found', HttpStatus.NOT_FOUND);
    }

    return newsFeedEntity;
  }

  async update(
    newsFeed: Partial<INewsFeedSchema>,
    conn: TConn = this.dataSource,
  ): Promise<{ newsFeedId: INewsFeedSchema['id'] }> {
    const newsFeedId = newsFeed.id;

    const beforeNewsFeedSchema = {
      title: newsFeed.title,
      content: newsFeed.content,
    } satisfies Pick<INewsFeedSchema, 'title' | 'content'>;

    await conn
      .getRepository(NewsFeedEntity)
      .createQueryBuilder()
      .update()
      .set(beforeNewsFeedSchema)
      .where('id = :newsFeedId', { newsFeedId })
      .updateEntity(false)
      .execute();

    return {
      newsFeedId,
    };
  }

  async softDelete(newsFeed: Pick<INewsFeedSchema, 'id' | 'deletedBy' | 'deletedAt'>, conn: TConn = this.dataSource) {
    const newsFeedId = newsFeed.id;

    const beforeNewsFeedSchema = {
      isDeleted: true,
      deletedBy: newsFeed.deletedBy,
      deletedAt: newsFeed.deletedAt ?? new Date(),
    } satisfies Pick<INewsFeedSchema, 'isDeleted' | 'deletedBy' | 'deletedAt'>;

    await conn
      .getRepository(NewsFeedEntity)
      .createQueryBuilder()
      .update()
      .set(beforeNewsFeedSchema)
      .where('id = :newsFeedId', { newsFeedId })
      .updateEntity(false)
      .execute();

    return {
      newsFeedId,
    };
  }

  async selectsWhereSchool(
    newsFeed: Pick<INewsFeedSchema, 'schoolId'>,
    conn: TConn = this.dataSource,
  ): Promise<Array<INewsFeedSchema>> {
    const newsFeedEntities = await conn
      .getRepository(NewsFeedEntity)
      .createQueryBuilder()
      .where(`school_id = :schoolId`, { schoolId: newsFeed.schoolId })
      .andWhere('is_deleted = :isDeleted', { isDeleted: false })
      .orderBy('id', 'DESC')
      .getMany();

    return newsFeedEntities;
  }

  async selectsWhereUserAndSchool(
    newsFeed: Pick<INewsFeedSchema, 'userId' | 'schoolId'>,
    conn: TConn = this.dataSource,
  ): Promise<Array<INewsFeedSchema>> {
    const newsFeedEntities = await conn
      .getRepository(NewsFeedEntity)
      .createQueryBuilder()
      .where(`user_id = :userId`, { userId: newsFeed.userId })
      .andWhere(`school_id = :schoolId`, { schoolId: newsFeed.schoolId })
      .andWhere('is_deleted = :isDeleted', { isDeleted: false })
      .orderBy('id', 'DESC')
      .getMany();

    return newsFeedEntities;
  }
}
