const DeleteComment = require('../../Domains/threads/entities/DeleteComment');

class DeleteCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(commentId, threadId, userId) {
    const deleteComment = new DeleteComment(commentId, threadId, userId);

    await this._threadRepository.verifyComment(commentId, userId);
    await this._threadRepository.deleteComment(deleteComment);
  }
}

module.exports = DeleteCommentUseCase;
