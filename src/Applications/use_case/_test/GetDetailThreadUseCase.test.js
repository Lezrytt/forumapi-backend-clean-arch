const GetDetailThreadUseCase = require('../GetDetailThreadUseCase');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');

describe('GetDetailThreadUseCase', () => {
  it('should simulate get thread detail correctly', async () => {
    const expectedThread = {
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2022-04-04 04:04:05.012345',
      username: 'dicoding',
    };

    const expectedComments = [{
      id: 'comment-id_test1',
      content: 'comment content test',
      date: '2022-04-04 04:04:05.012345',
      username: 'johndoe',
    },
    {
      id: 'comment-id_test2',
      content: 'deleted',
      date: '2022-04-04 04:04:05.012345',
      username: 'johndoe',
    },
    ];

    const result = {
      ...expectedThread,
      comments: expectedComments,
    };

    const mockThreadRepository = new ThreadRepository();

    mockThreadRepository.getDetailThread = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedThread));

    mockThreadRepository.getThreadComments = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedComments));

    const getDetailThreadUseCase = new GetDetailThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    const getThread = await getDetailThreadUseCase.execute('thread-123');

    // action
    expect(getThread).toStrictEqual(result);
    expect(mockThreadRepository.getDetailThread).toBeCalledWith('thread-123');
    expect(mockThreadRepository.getThreadComments).toBeCalledWith('thread-123');
  });
});
