const InvariantError = require('../../../Commons/exceptions/InvariantError');

class AddComment {
  constructor(object) {
    const { userId, content, threadId } = object;

    this._verifyPayload(content);
    this._verifyUserId(userId);
    this._verifyParams(threadId);

    this.userId = userId;
    this.content = content;
    this.threadId = threadId;
  }

  _verifyParams(threadId) {
    if (!threadId) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof threadId !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyPayload(content) {
    if (!content) {
      throw new InvariantError('Fail to add comment');
    }

    if (typeof content !== 'string') {
      throw new InvariantError('Fail to add comment');
    }
  }

  // _verifyPayload({ content }) {
  //   if (!content) {
  //     throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  //   }

  //   if (typeof content !== 'string') {
  //     throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  //   }
  // }

  _verifyUserId(userId) {
    if (!userId) {
      throw new Error('ADD_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof userId !== 'string') {
      throw new Error('ADD_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddComment;
