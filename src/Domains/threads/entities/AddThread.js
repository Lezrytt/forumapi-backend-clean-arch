/* eslint-disable no-underscore-dangle */
class AddThread {
  constructor(userId, payload) {
    this._verifyPayload(payload);
    this._verifyUserId(userId);

    const { title, body } = payload;

    this.userId = userId;
    this.title = title;
    this.body = body;
  }

  _verifyPayload({ title, body }) {
    if (!title || !body) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof title !== 'string' || typeof body !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyUserId(userId) {
    if (!userId) {
      throw new Error('ADD_THREAD.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof userId !== 'string') {
      throw new Error('ADD_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddThread;
