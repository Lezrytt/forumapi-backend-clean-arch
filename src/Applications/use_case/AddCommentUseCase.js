const AddComment = require('../../Domains/threads/entities/AddComment');
const InvariantError = require('../../Commons/exceptions/InvariantError');

class AddCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userId, payload, threadId) {
    this._verifyPayload(payload);
    const addComment = new AddComment(userId, payload, threadId);

    // this._threadRepository.findThreadById();

    return this._threadRepository.addComment(addComment);
  }

  _verifyPayload(payload) {
    const { content } = payload;
    if (!content) {
      throw new InvariantError('Fail to add comment');
    }

    if (typeof content !== 'string') {
      throw new InvariantError('Fail to add comment');
    }
  }
}

module.exports = AddCommentUseCase;
