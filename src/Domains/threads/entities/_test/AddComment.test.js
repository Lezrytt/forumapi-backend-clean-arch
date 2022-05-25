const AddComment = require('../AddComment');

describe('a AddComment entity', () => {
  it('should create AddComment entity correctly ', () => {
    // Arrange
    const payload = {
      content: 'asdl',
    };

    const id = 'user-123';
    const _threadId = 'thread-123';

    const { userId, content, threadId } = new AddComment(id, payload, _threadId);

    // Action and Assert
    expect(userId).toEqual(id);
    expect(content).toEqual(payload.content);
    expect(threadId).toEqual(_threadId);
  });
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

  it('should throw error when params did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'asdl',
    };

    const userId = 'user-123';
    const threadId = '';

    // Action and Assert
    expect(() => new AddComment(userId, payload, threadId)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when params did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 'asd1',
    };

    const userId = 'user-123';
    const threadId = {};

    // Action and Assert
    expect(() => new AddComment(userId, payload, threadId)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when user_id did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'asdl',
    };

    const userId = '';
    const threadId = 'thread-123';

    // Action and Assert
    expect(() => new AddComment(userId, payload, threadId)).toThrowError('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when user_id did not meet data type specification', () => {
    // Arrange
    const payload = {
      content: 'asd1',
    };

    const userId = {};
    const threadId = 'thread-123';

    // Action and Assert
    expect(() => new AddComment(userId, payload, threadId)).toThrowError('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
