import { SubscriptionController } from '#controllers/subscription.controller';
import { ResSubscriptionDto } from '#dtos/ResSubscriptionDto';
import ISubscriptionSchema from '#entities/interfaces/ISubscriptionSchema';
import { SubscriptionService } from '#services/subscription.service';
import { Test, TestingModule } from '@nestjs/testing';
import 'jest';

const mockSubscription = {
  subscribe: {
    id: 1,
    userId: 2,
    schoolId: 1,
    subscribedAt: new Date(),
    unsubscribedAt: undefined,
    isSubscribed: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  unsubscribe: {
    id: 2,
    userId: 2,
    schoolId: 2,
    subscribedAt: new Date(),
    unsubscribedAt: new Date(),
    isSubscribed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
} satisfies Record<'subscribe' | 'unsubscribe', ISubscriptionSchema>;

const mockSubscriptionService = {
  subscribe: jest.fn().mockImplementation(() => {
    return {
      ...mockSubscription['subscribe'],
    };
  }) satisfies SubscriptionService['subscribe'],
  unsubscribe: jest.fn().mockImplementation(() => {
    return {
      ...mockSubscription['unsubscribe'],
    };
  }) satisfies SubscriptionService['unsubscribe'],
};

describe('SubscriptionController', () => {
  let subscriptionController: SubscriptionController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let subscriptionService: SubscriptionService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubscriptionController],
      providers: [SubscriptionService],
    })
      .overrideProvider(SubscriptionService)
      .useValue(mockSubscriptionService)
      .compile();

    subscriptionController = app.get<SubscriptionController>(SubscriptionController);
    subscriptionService = app.get<SubscriptionService>(SubscriptionService);
  });

  describe('postSubscription', () => {
    it('subscription 구독', async () => {
      expect(
        await subscriptionController.postSubscription(
          {
            userId: mockSubscription['subscribe']['userId'],
          },
          {
            schoolId: mockSubscription['subscribe']['schoolId'],
          },
        ),
      ).toEqual(new ResSubscriptionDto(mockSubscription['subscribe']));
    });
  });

  describe('patchSubscription', () => {
    it('subscription 구독 취소', async () => {
      expect(
        await subscriptionController.patchSubscription(
          {
            userId: mockSubscription['unsubscribe']['userId'],
          },
          {
            schoolId: mockSubscription['unsubscribe']['schoolId'],
            subscriptionId: mockSubscription['unsubscribe']['id'],
          },
        ),
      ).toEqual(new ResSubscriptionDto(mockSubscription['unsubscribe']));
    });
  });
});
