import getInsertResultId from '#entities/getInsertResultId';
import IUserSchema from '#entities/interfaces/IUserSchema';
import { TConn } from '#entities/interfaces/TConn';
import UserEntity from '#entities/user.entity';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(private dataSource: DataSource) {}

  async insert(
    user: Pick<IUserSchema, 'name' | 'email' | 'type'>,
    conn: TConn = this.dataSource,
  ): Promise<{
    userId: IUserSchema['id'];
  }> {
    const logger = new Logger();
    const beforeUserSchema = {
      name: user.name,
      email: user.email,
      type: user.type,
    } satisfies Pick<IUserSchema, 'name' | 'email' | 'type'>;

    const userResult = await conn
      .getRepository(UserEntity)
      .createQueryBuilder()
      .insert()
      .values(beforeUserSchema)
      .updateEntity(false)
      .execute();

    const userId = getInsertResultId(userResult);

    return {
      userId,
    };
  }

  async select(userId: IUserSchema['id'], conn: TConn = this.dataSource): Promise<IUserSchema> {
    const userEntity = await conn
      .getRepository(UserEntity)
      .createQueryBuilder()
      .where(`id = :userId`, { userId })
      .orderBy(`id`, 'DESC')
      .getOne();

    if (userEntity == null) {
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    }

    return userEntity;
  }
}
