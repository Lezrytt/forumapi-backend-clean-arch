const AddComment = require('../AddComment');

describe('a AddComment entity', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content2: 'asdl',
    };

    const userId = 'user-123';
    const threadId = 'thread-123';

    // Action and Assert
    expect(() => new AddComment(userId, payload, threadId)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: {},
    };

    const userId = 'user-123';
    const threadId = 'thread-123';

    // Action and Assert
    expect(() => new AddComment(userId, payload, threadId)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
