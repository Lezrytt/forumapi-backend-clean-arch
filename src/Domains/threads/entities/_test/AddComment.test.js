const AddComment = require('../AddComment');

describe('a AddComment entity', () => {
  it('should create AddComment entity correctly ', () => {
    // Arrange
    const payload = {
      userId: 'user-123',
      content: 'asdl',
      threadId: 'thread-123',
    };

    const id = 'user-123';
    const _threadId = 'thread-123';

    const { userId, content, threadId } = new AddComment(payload);

    // Action and Assert
    expect(userId).toEqual(id);
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(_threadId);
  });
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content2: 'asdl',
      userId: 'user-123',
      threadId: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('Fail to add comment');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: {},

      userId: 'user-123',
      threadId: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('Fail to add comment');
  });

  it('should throw error when params did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'asdl',
      userId: 'user-123',
      threadId: '',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when params did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 'asd1',
      userId: 'user-123',
      threadId: {},
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when user_id did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'asdl',
      userId: '',
      threadId: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when user_id did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 'asd1',
      userId: {},
      threadId: 'thread-123',
    };

    // Action and Assert
    expect(() => new AddComment(payload)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
