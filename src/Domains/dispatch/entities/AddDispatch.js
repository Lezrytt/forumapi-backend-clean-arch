class AddDispatch {
  constructor(object) {
    const {
      id, userId, dispatch, createdAt,
    } = object;

    this._verifyPayload(dispatch);
    this._verifyParams(userId);

    this.id = id;
    this.createdAt = createdAt;
    this.userId = userId;
    this.dispatch = dispatch;
  }

  _verifyParams(userId) {
    if (!userId) {
      throw new Error('ADD_DISPATCH.NOT_CONTAIN_NEEDED_PROPERTY_TID');
    }

    if (typeof userId !== 'string') {
      throw new Error('ADD_DISPATCH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }

  _verifyPayload(dispatch) {
    if (!dispatch) {
      throw new Error('ADD_DISPATCH.NOT_CONTAIN_NEEDED_PROPERTY_TID');
    }

    if (typeof dispatch !== 'string') {
      throw new Error('ADD_DISPATCH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = AddDispatch;
