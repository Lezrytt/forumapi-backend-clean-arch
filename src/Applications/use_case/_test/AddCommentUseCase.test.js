const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const AddComment = require('../../../Domains/threads/entities/AddComment');
const AddedComment = require('../../../Domains/threads/entities/AddedComment');

describe('AddCommentUseCase', () => {
  it('should simulate adding comment action correctly', async () => {
    // Arrange
    const payload = {
      content: 'Comment',
    };

    const threadId = 'thread-123';

    const userId = 'user-123';

    const expectedAddedComment = new AddedComment({
      id: 'comment-123',
      content: payload.content,
      owner: userId,
    });

    // creating depdency of the use case

    const mockThreadRepository = new ThreadRepository();

    // mocking the function

    mockThreadRepository.findThread = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.addComment = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAddedComment));

    // creating use case instance

    const getThreadUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert
    const addedComment = await getThreadUseCase.execute(userId, payload, threadId);

    // Action
    expect(addedComment).toStrictEqual(expectedAddedComment);
    expect(mockThreadRepository.addComment).toBeCalledWith(new AddComment(userId, {
      content: payload.content,
    }, threadId));
    expect(mockThreadRepository.findThread).toBeCalledWith(threadId);
  });

  it('should create error when payload did not contain needed property', async () => {
    // Arrange
    const payload = {
      content: {},
    };

    const threadId = 'thread-123';

    const userId = 'user-123';

    // creating depdency of the use case

    const mockThreadRepository = new ThreadRepository();

    // creating use case instance

    const getThreadUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert & Action
    await expect(getThreadUseCase.execute(userId, payload, threadId))
      .rejects
      .toThrowError('Fail to add comment');
  });

  it('should create error when payload did not meet data type specification', async () => {
    // Arrange
    const payload = {
      content3: 'comment-123',
    };

    const threadId = 'thread-123';

    const userId = 'user-123';

    // creating depdency of the use case

    const mockThreadRepository = new ThreadRepository();

    // creating use case instance

    const getThreadUseCase = new AddCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Assert & Action
    await expect(getThreadUseCase.execute(userId, payload, threadId))
      .rejects
      .toThrowError('Fail to add comment');
  });
});
