import { createMock } from '@golevelup/ts-jest';
import { Repository } from 'typeorm';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<unknown>;
};

/** Just a placeholder. Each call should be overriden in test files */
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn((entity) => entity),
    find: jest.fn((entity) => [entity]),
    create: jest.fn((entity) => entity),
    save: jest.fn((entity) => entity),
    findOneBy: jest.fn(),
    remove: jest.fn(),
    manager: jest.fn().mockReturnValue(mockEntityManager),
  }),
);

export const mockEntityManager = {
  findOne: jest.fn((entity) => entity),
  find: jest.fn((entity) => [entity]),
  create: jest.fn((entity) => entity),
  save: jest.fn((entity) => entity),
  findOneBy: jest.fn(),
  remove: jest.fn(),
  transaction: jest.fn(),
  getCustomRepository: jest.fn(
    (fn) =>
      mockEntityManager[fn] ||
      (mockEntityManager[fn] = createMock<typeof fn>()),
  ),
};
