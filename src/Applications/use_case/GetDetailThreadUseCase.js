/* eslint-disable no-param-reassign */
class GetDetailThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    const detail = await this._threadRepository.getDetailThread(threadId);
    const comments = await this._threadRepository.getThreadComments(threadId);

    comments.forEach((value, index, arr) => {
      if (value.content === 'deleted') {
        arr[index].content = '**komentar telah dihapus**';
      }
    });

    const thread = {
      id: detail.id,
      title: detail.title,
      body: detail.body,
      date: detail.date,
      username: detail.username,
      comments,
    };

    return thread;
  }
}

module.exports = GetDetailThreadUseCase;
