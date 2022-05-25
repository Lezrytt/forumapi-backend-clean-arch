const AddThread = require('../AddThread');

describe('a AddThread entities', () => {
  it('should create AddThread entity correctly', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: '123',
    };

    const userId = 'user-1';

    const addThread = new AddThread(userId, payload);

    // Action and Assert
    expect(addThread.body).toEqual(payload.body);
    expect(addThread.title).toEqual(payload.title);
    expect(addThread.userId).toEqual(userId);
  });
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
    };

    const userId = 'user-1';

    // Action and Assert
    expect(() => new AddThread(userId, payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 123,
      body: 123,
    };

    const userId = 'user-1';

    // Action and Assert
    expect(() => new AddThread(userId, payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should throw error when user_id did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'abc',
      body: '123',
    };

    const userId = '';

    // Action and Assert
    expect(() => new AddThread(userId, payload)).toThrowError('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when user_id did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 'asd',
      body: 'asd',
    };

    const userId = {};

    // Action and Assert
    expect(() => new AddThread(userId, payload)).toThrowError('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });
});
