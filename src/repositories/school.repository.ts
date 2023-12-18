import getInsertResultId from '#entities/getInsertResultId';
import ISchoolSchema from '#entities/interfaces/ISchoolSchema';
import { TConn } from '#entities/interfaces/TConn';
import SchoolEntity from '#entities/school.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SchoolRepository {
  constructor(private dataSource: DataSource) {}

  async insert(
    school: Pick<ISchoolSchema, 'name' | 'location'>,
    conn: TConn = this.dataSource,
  ): Promise<{
    schoolId: ISchoolSchema['id'];
  }> {
    const beforeSchoolSchema = {
      name: school.name,
      location: school.location,
    } satisfies Pick<ISchoolSchema, 'name' | 'location'>;

    const schoolResult = await conn
      .getRepository(SchoolEntity)
      .createQueryBuilder()
      .insert()
      .values(beforeSchoolSchema)
      .updateEntity(false)
      .execute();

    const schoolId = getInsertResultId(schoolResult);

    return {
      schoolId,
    };
  }

  async select(schoolId: ISchoolSchema['id'], conn: TConn = this.dataSource): Promise<ISchoolSchema> {
    const schoolEntity = await conn
      .getRepository(SchoolEntity)
      .createQueryBuilder()
      .where(`id = :schoolId`, { schoolId })
      .orderBy(`id`, 'DESC')
      .getOne();

    if (schoolEntity == null) {
      throw new HttpException('school not found', HttpStatus.NOT_FOUND);
    }

    return schoolEntity;
  }
}
