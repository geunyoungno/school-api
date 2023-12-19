import { UserController } from '#controllers/user.controller';
import { ResUserDto } from '#dtos/ResUserDto';
import { CE_USER_TYPE, TUserType } from '#entities/interfaces/CE_USER_TYPE';
import IUserSchema from '#entities/interfaces/IUserSchema';
import { UserService } from '#services/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import 'jest';

const mockUser = {
  [CE_USER_TYPE.ADMINISTRATOR]: {
    id: 1,
    name: '학교 관리자',
    email: 'administrator@example.com',
    type: CE_USER_TYPE.ADMINISTRATOR,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  [CE_USER_TYPE.STUDENT]: {
    id: 2,
    name: '학생',
    email: 'student@example.com',
    type: CE_USER_TYPE.STUDENT,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
} satisfies Record<TUserType, IUserSchema>;

const mockUserService = {
  create: jest.fn().mockImplementation(() => {
    return {
      ...mockUser['administrator'],
    };
  }) satisfies UserService['create'],
};

describe('UserController', () => {
  let userController: UserController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    userController = app.get<UserController>(UserController);
    userService = app.get<UserService>(UserService);
  });

  describe('postUser', () => {
    it('user 생성', async () => {
      expect(await userController.postUser(mockUser['administrator'])).toEqual(
        new ResUserDto(mockUser['administrator']),
      );
    });
  });
});
