const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddThreadUseCase = require('../AddThreadUseCase');
const AddThread = require('../../../Domains/threads/entities/AddThread');

describe('AddThreadUseCase', () => {
  it('should simulate adding thread action correctly', async () => {
    // Arrance
    const payload = {
      title: 'Thread Title',
      body: 'Body Thread',
    };
    const userId = 'user-1';

    const expectedAddedThread = {
      id: 'thread-1',
      title: payload.title,
      body: payload.body,
      owner: userId,
    };

    // creating depedency of the usecase

    const mockThreadRepository = new ThreadRepository();

    // mocking the function

    mockThreadRepository.addThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedThread));

    // creating use case instance

    const getThreadUseCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    const addedThread = await getThreadUseCase.execute(userId, payload);

    // Action
    expect(addedThread).toStrictEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toBeCalledWith(new AddThread(userId, {
      title: payload.title,
      body: payload.body,
    }));
  });
});
