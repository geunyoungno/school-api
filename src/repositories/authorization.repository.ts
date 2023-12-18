import AuthorizationEntity from '#entities/authorization.entity';
import getInsertResultId from '#entities/getInsertResultId';
import { CE_AUTHORIZATION_TARGET } from '#entities/interfaces/CE_AUTHORIZATION_TARGET';
import IAuthorizationSchema from '#entities/interfaces/IAuthorizationSchema';
import { TConn } from '#entities/interfaces/TConn';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthorizationRepository {
  constructor(private dataSource: DataSource) {}

  async insert(
    authorization: Pick<IAuthorizationSchema, 'userId' | 'target' | 'targetId'>,
    conn: TConn = this.dataSource,
  ): Promise<{ authorizationId: IAuthorizationSchema['id'] }> {
    const beforeAuthorizationSchema = {
      userId: authorization.userId,
      target: authorization.target,
      targetId: authorization.targetId,
    } satisfies Pick<IAuthorizationSchema, 'userId' | 'target' | 'targetId'>;

    const authorizationResult = await conn
      .getRepository(AuthorizationEntity)
      .createQueryBuilder()
      .insert()
      .values(beforeAuthorizationSchema)
      .updateEntity(false)
      .execute();

    const authorizationId = getInsertResultId(authorizationResult);

    return {
      authorizationId,
    };
  }

  async select(
    authorizationId: IAuthorizationSchema['id'],
    conn: TConn = this.dataSource,
  ): Promise<IAuthorizationSchema> {
    const authorizationEntity = await conn
      .getRepository(AuthorizationEntity)
      .createQueryBuilder()
      .where(`id = :authorizationId`, { authorizationId })
      .orderBy(`id`, 'DESC')
      .getOne();

    if (authorizationEntity == null) {
      throw new HttpException('authorization not found', HttpStatus.NOT_FOUND);
    }

    return authorizationEntity;
  }

  async selectWhereUserAndSchool(
    {
      userId,
      schoolId,
    }: Pick<IAuthorizationSchema, 'userId'> & {
      schoolId: number;
    },
    conn: TConn = this.dataSource,
  ) {
    const authorizationEntity = await conn
      .getRepository(AuthorizationEntity)
      .createQueryBuilder()
      .where(`user_id = :userId`, { userId })
      .andWhere(`target = :target`, {
        target: CE_AUTHORIZATION_TARGET.SCHOOL,
      })
      .andWhere(`target_id = :schoolId`, { schoolId })
      .orderBy(`id`, 'DESC')
      .getOne();

    if (authorizationEntity == null) {
      throw new HttpException('authorization not found', HttpStatus.NOT_FOUND);
    }

    return authorizationEntity;
  }
}
