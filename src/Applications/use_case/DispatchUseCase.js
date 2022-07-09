const AddDispatch = require('../../Domains/dispatch/entities/AddDispatch');

class DispatchUseCase {
  constructor({ dispatchRepository }) {
    this._dispatchRepository = dispatchRepository;
  }

  async postDispatch(payload) {
    const { userId, dispatch } = payload;

    const addDispatch = new AddDispatch({ userId, dispatch });

    return this._dispatchRepository.addDispatch(addDispatch);
  }

  async getDispatch(params) {
    const { owner } = params;

    return this._dispatchRepository.getDispatch(owner);
  }
}

module.exports = DispatchUseCase;
