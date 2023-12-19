import IUserSchema from '#entities/interfaces/IUserSchema';
import { UserRepository } from '#repositories/user.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    private dataSource: DataSource,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * 사용자 생성
   */
  async create(args: { user: Pick<IUserSchema, 'name' | 'email' | 'type'> }): Promise<IUserSchema> {
    // stage 1: 사용자 추가
    const beforeUserSchema = {
      name: args.user.name,
      email: args.user.email,
      type: args.user.type,
    } satisfies Pick<IUserSchema, 'name' | 'email' | 'type'>;

    const { userId } = await this.userRepository.insert(beforeUserSchema);

    const userEntity = await this.userRepository.select(userId);

    return userEntity;
  }
}
