const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const AddCommentUseCase = require('../AddCommentUseCase');
const AddComment = require('../../../Domains/threads/entities/AddComment');

describe('AddCommentUseCase', () => {
  it('should simulate adding comment action correctly', async () => {
    // Arrange
    const payload = {
      content: 'Comment',
    };

    const threadId = 'thread-123';

    const userId = 'user-123';

    const expectedAddedComment = {
      id: 'comment-123',
      content: payload.content,
      threadId,
      owner: userId,
    };

    // creating depdency of the use case

    const mockThreadRepository = new ThreadRepository();

    // mocking the function

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
  });
});
