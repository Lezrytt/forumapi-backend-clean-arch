class DeleteComment {
  constructor(commentId, threadId, userId) {
    this._verifyUserId(userId);
    this._verifyParams(commentId, threadId);

    this.commentId = commentId;
    this.threadId = threadId;
    this.userId = userId;
  }

  _verifyUserId(userId) {
    if (!userId) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof userId !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyParams(commentId, threadId) {
    if (!commentId || !threadId) {
      throw new Error('DELETE_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof commentId !== 'string' || typeof threadId !== 'string') {
      throw new Error('DELETE_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = DeleteComment;
