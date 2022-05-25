const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should simulate delete comment action correctly', async () => {
    // Arrange
    const userId = 'user-123';
    const threadId = 'thread-123';
    const commentId = 'comment-123';

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.deleteComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.verifyComment = jest.fn()
      .mockImplementation(() => Promise.resolve());

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Act
    await deleteCommentUseCase.execute(commentId, threadId, userId);

    expect(mockThreadRepository.verifyComment).toBeCalledWith(commentId, userId);
    expect(mockThreadRepository.deleteComment)
      .toHaveBeenCalledWith({ commentId, threadId, userId });
  });
});
