const AddComment = require('../../Domains/threads/entities/AddComment');

class AddCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userId, payload, threadId) {
    const { content } = payload;

    await this._threadRepository.findThread(threadId);

    const addComment = new AddComment({ userId, content, threadId });

    return this._threadRepository.addComment(addComment);
  }
}

module.exports = AddCommentUseCase;
