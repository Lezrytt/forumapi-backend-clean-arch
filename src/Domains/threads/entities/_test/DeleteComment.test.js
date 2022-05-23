const DeleteComment = require('../DeleteComment');

describe('a DeleteComment entity', () => {
  it('should throw error when not meet data type specification', () => {
    // Arrange
    const userId = {};
    const threadId = 'string';
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
});
