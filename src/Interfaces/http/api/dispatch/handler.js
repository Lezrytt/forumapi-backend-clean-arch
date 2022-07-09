const DispatchUseCase = require('../../../../Applications/use_case/DispatchUseCase');
// const AddCommentUseCase = require('../../../../Applications/use_case/AddCommentUseCase');
// const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
// const GetDetailThreadUseCase = require('../../../../Applications/use_case/GetDetailThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postDispatchHandler = this.postDispatchHandler.bind(this);
    this.getDispatchHandler = this.getDispatchHandler.bind(this);
  }

  async postDispatchHandler(request, h) {
    // try {
    const dispatchUseCase = this._container.getInstance(DispatchUseCase.name);

    const addDispatch = await dispatchUseCase.postDispatch(request.payload);

    const response = h.response({
      status: 'success',
      data:
          addDispatch,
    });
    response.code(201);
    return response;
    // } catch (e) {
    //   const response = h.response({
    //     status: 'fail',
    //     message: e.message,
    //   });
    //   response.code(500);
    //   console.log(e);
    //   return response;
    // }
  }

  async getDispatchHandler(request, h) {
    // try {
    const dispatchUseCase = this._container.getInstance(DispatchUseCase.name);

    const getDispatch = await dispatchUseCase.getDispatch(request.params);

    const response = h.response({
      status: 'success',
      data:
          getDispatch,
    });
    response.code(200);
    return response;
    // } catch (e) {
    //   const response = h.response({
    //     status: 'fail',
    //     message: e.message,
    //   });
    //   response.code(500);
    //   console.log(e);
    //   return response;
    // }
  }
}

module.exports = ThreadsHandler;
