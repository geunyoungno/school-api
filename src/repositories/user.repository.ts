import IUserSchema from '#entities/interfaces/IUserSchema';
import { TConn } from '#entities/interfaces/TConn';
import UserEntity from '#entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(private dataSource: DataSource) {}

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
