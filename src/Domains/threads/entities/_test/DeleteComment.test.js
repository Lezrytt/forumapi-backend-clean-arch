const DeleteComment = require('../DeleteComment');

describe('a DeleteComment entity', () => {
  it('should create DeleteComment entity correctly', () => {
    // Arrange
    const userId = '123';
    const threadId = '123';
    const commentId = 'commet-123';
    const deleteComment = new DeleteComment(commentId, threadId, userId);
    expect(deleteComment.commentId).toEqual(commentId);
    expect(deleteComment.threadId).toEqual(threadId);
    expect(deleteComment.userId).toEqual(userId);
  });
  it('should throw error when not meet data type specification', () => {
    // Arrange
    const userId = '123';
    const threadId = {};
    const commentId = 'commet-123';
    expect(() => new DeleteComment(commentId, threadId, userId)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when not contain needed property', () => {
    const payload = {
      threadId2: '123',
    };
    const userId = '123';
    const commentId = 'comment-123';
    expect(() => new DeleteComment(commentId, payload.threadId, userId)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when user_id not meet data type specification', () => {
    // Arrange
    const userId = {};
    const threadId = 'string';
    const commentId = 'commet-123';
    expect(() => new DeleteComment(commentId, threadId, userId)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when user_id not contain needed property', () => {
    const payload = {
      threadId: '123',
    };
    const userId = '';
    const commentId = 'comment-123';
    expect(() => new DeleteComment(commentId, payload.threadId, userId)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when params not meet data type specification', () => {
    // Arrange
    const userId = '123';
    const threadId = 'string';
    const commentId = {};
    expect(() => new DeleteComment(commentId, threadId, userId)).toThrowError('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when params not contain needed property', () => {
    const payload = {
      threadId: '123',
    };
    const userId = '123';
    const commentId = '';
    expect(() => new DeleteComment(commentId, payload.threadId, userId)).toThrowError('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });
});
