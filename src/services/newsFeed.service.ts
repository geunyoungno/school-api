import { CE_USER_TYPE } from '#entities/interfaces/CE_USER_TYPE';
import INewsFeedSchema from '#entities/interfaces/INewsFeedSchema';
import IUserSchema from '#entities/interfaces/IUserSchema';
import NewsFeedEntity from '#entities/newsFeed.entity';
import { AuthorizationRepository } from '#repositories/authorization.repository';
import { NewsFeedRepository } from '#repositories/newsFeed.repository';
import { SubscriptionRepository } from '#repositories/subscription.repository';
import { UserRepository } from '#repositories/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class NewsFeedService {
  constructor(
    private dataSource: DataSource,
    private readonly userRepository: UserRepository,
    private readonly authorizationRepository: AuthorizationRepository,
    private readonly newsFeedRepository: NewsFeedRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  /**
   * 관리자인지 확인
   * @param args
   * @returns
   */
  async isAdministrator(args: { userId: INewsFeedSchema['userId']; schoolId: INewsFeedSchema['schoolId'] }) {
    const user = await this.userRepository.select(args.userId);
    if (user.type !== CE_USER_TYPE.ADMINISTRATOR) {
      throw new HttpException('user not administrator', HttpStatus.BAD_REQUEST);
    }
    const authorization = await this.authorizationRepository.selectWhereUserAndSchool({
      userId: user.id,
      schoolId: args.schoolId,
    });

    return {
      user,
      authorization,
    };
  }

  /**
   * 학생인지 검증
   * @param args
   * @returns
   */
  async isStudent(args: { userId: INewsFeedSchema['userId']; schoolId: INewsFeedSchema['schoolId'] }) {
    const user = await this.userRepository.select(args.userId);
    if (user.type !== CE_USER_TYPE.STUDENT) {
      throw new HttpException('user not student', HttpStatus.BAD_REQUEST);
    }
    const subscription = await this.subscriptionRepository.selectWhereUserAndSchool({
      userId: user.id,
      schoolId: args.schoolId,
    });

    return {
      user,
      subscription,
    };
  }

  /**
   * 학교 관리자는 학교 페이지 내에 소식을 작성할 수 있다
   */
  async create(args: {
    userId: IUserSchema['id'];
    newsFeed: Pick<INewsFeedSchema, 'title' | 'content' | 'schoolId'>;
  }): Promise<INewsFeedSchema> {
    // stage 1: 사용자 및 인가 확인
    await this.isAdministrator({
      userId: args.userId,
      schoolId: args.newsFeed.schoolId,
    });

    // stage 2: 뉴스 피드 추가
    const beforeNewsFeedSchema = {
      title: args.newsFeed.title,
      content: args.newsFeed.content,
      userId: args.userId,
      schoolId: args.newsFeed.schoolId,
      createdBy: `${args.userId}`,
    } satisfies Pick<INewsFeedSchema, 'title' | 'content' | 'userId' | 'schoolId' | 'createdBy'>;

    const { newsFeedId } = await this.newsFeedRepository.insert(beforeNewsFeedSchema);

    const newsFeedEntity = await this.newsFeedRepository.select(newsFeedId);

    return newsFeedEntity;
  }

  /**
   * 학교 관리자는 작성된 소식을 수정할 수 있다
   */
  async update(args: {
    userId: IUserSchema['id'];
    newsFeed: Pick<INewsFeedSchema, 'id' | 'schoolId'> & Partial<Pick<INewsFeedSchema, 'title' | 'content'>>;
  }): Promise<INewsFeedSchema> {
    // stage 1: 사용자 및 인가 확인
    await this.isAdministrator({
      userId: args.userId,
      schoolId: args.newsFeed.schoolId,
    });

    const newsFeedId = args.newsFeed.id;

    const beforeNewsFeedSchema = {
      title: args.newsFeed.title,
      content: args.newsFeed.content,
      updatedBy: `${args.userId}`,
    } satisfies Pick<INewsFeedSchema, 'title' | 'content' | 'updatedBy'>;

    await this.newsFeedRepository.update(beforeNewsFeedSchema);

    await this.dataSource
      .getRepository(NewsFeedEntity)
      .createQueryBuilder()
      .update()
      .set(beforeNewsFeedSchema)
      .where('id = :newsFeedId', { newsFeedId })
      .updateEntity(false)
      .execute();

    const newsFeedEntity = await this.newsFeedRepository.select(newsFeedId);

    return newsFeedEntity;
  }

  /**
   * 학교 관리자는 작성된 소식을 삭제할 수 있다
   */
  async softDelete(args: {
    userId: IUserSchema['id'];
    newsFeed: Pick<INewsFeedSchema, 'id' | 'schoolId'>;
  }): Promise<INewsFeedSchema> {
    // stage 1: 사용자 및 인가 확인
    await this.isAdministrator({
      userId: args.userId,
      schoolId: args.newsFeed.schoolId,
    });

    const newsFeedEntity = await this.newsFeedRepository.select(args.newsFeed.id);

    // stage 2: soft delete 처리
    const beforeNewsFeedSchema = {
      id: newsFeedEntity.id,
      deletedAt: new Date(),
      deletedBy: `${args.userId}`,
    } satisfies Pick<INewsFeedSchema, 'id' | 'deletedAt' | 'deletedBy'>;

    await this.newsFeedRepository.softDelete(beforeNewsFeedSchema);

    return newsFeedEntity;
  }

  /**
   * 학생은 구독 중인 학교 페이지별 소식을 볼 수 있다
   */
  async readsBySchoolAndStudent(args: {
    userId: IUserSchema['id'];
    newsFeed: Pick<INewsFeedSchema, 'schoolId'>;
  }): Promise<Array<INewsFeedSchema>> {
    // stage 1: 사용자 확인
    await this.isStudent({
      userId: args.userId,
      schoolId: args.newsFeed.schoolId,
    });

    // stage 2:뉴스 피드 목록 조회
    const newsFeeds = await this.newsFeedRepository.selectsWhereSchool({
      schoolId: args.newsFeed.schoolId,
    });

    return newsFeeds;
  }
}
