import { CE_AUTHORIZATION_TARGET } from '#entities/interfaces/CE_AUTHORIZATION_TARGET';
import { CE_USER_TYPE } from '#entities/interfaces/CE_USER_TYPE';
import IAuthorizationSchema from '#entities/interfaces/IAuthorizationSchema';
import ISchoolSchema from '#entities/interfaces/ISchoolSchema';
import IUserSchema from '#entities/interfaces/IUserSchema';
import { AuthorizationRepository } from '#repositories/authorization.repository';
import { SchoolRepository } from '#repositories/school.repository';
import { SubscriptionRepository } from '#repositories/subscription.repository';
import { UserRepository } from '#repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class SchoolService {
  constructor(
    private dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  /**
   * 학교 관리자인지 확인
   * @param args
   * @returns
   */
  async isAdministrator(args: { userId: IUserSchema['id'] }) {
    const user = await this.userRepository.select(args.userId);
    if (user.type !== CE_USER_TYPE.ADMINISTRATOR) {
      throw new HttpException('user not administrator', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  /**
   * 학생인지 확인
   * @param args
   * @returns
   */
  async isStudent(args: { userId: IUserSchema['id'] }) {
    const user = await this.userRepository.select(args.userId);
    if (user.type !== CE_USER_TYPE.STUDENT) {
      throw new HttpException('user not student', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  /**
   * 학교 관리자는 지역, 학교명으로 학교 페이지를 생성할 수 있다
   */
  async create(args: {
    userId: IUserSchema['id'];
    school: Pick<ISchoolSchema, 'name' | 'location'>;
  }): Promise<ISchoolSchema> {
    // stage 1: 사용자 확인
    this.isAdministrator({
      userId: args.userId,
    });

    // stage 2: 헉교 및 인가 추가
    const schoolId = await this.dataSource.transaction(async (tran) => {
      // stage 2.1: 학교 추가
      const beforeSchoolSchema = {
        name: args.school.name,
        location: args.school.location,
      } satisfies Pick<ISchoolSchema, 'name' | 'location'>;

      const { schoolId } = await this.schoolRepository.insert(beforeSchoolSchema, tran);

      // stage 2.2: 사용자에게 학교 역활 추가
      const beforeAuthorizationSchema = {
        userId: args.userId,
        target: CE_AUTHORIZATION_TARGET.SCHOOL,
        targetId: schoolId,
      } satisfies Pick<IAuthorizationSchema, 'userId' | 'target' | 'targetId'>;

      await this.authorizationRepository.insert(beforeAuthorizationSchema, tran);

      return schoolId;
    });

    const schoolEntity = await this.schoolRepository.select(schoolId);

    return schoolEntity;
  }

  /**
   * 학생은 구독 중인 학교 페이지 목록을 확인할 수 있다.
   */
  async readsByStudent(args: { userId: IUserSchema['id'] }): Promise<Array<ISchoolSchema>> {
    // stage 1: 사용자 확인
    await this.isStudent({ userId: args.userId });

    // stage 2: 구독 중인 학교 조회
    const subscriptions = await this.subscriptionRepository.selectsWhereUser(args.userId);

    const schoolds = subscriptions
      .map((subscription) => subscription.school)
      .filter((school): school is ISchoolSchema => school != null);

    return schoolds;
  }
}
