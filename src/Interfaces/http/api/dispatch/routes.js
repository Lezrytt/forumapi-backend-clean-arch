const routes = (handler) => ([
  {
    method: 'POST',
    path: '/dispatch',
    handler: handler.postDispatchHandler,
  },
  {
    method: 'GET',
    path: '/dispatch/{owner}',
    handler: handler.getDispatchHandler,
  },
]);

module.exports = routes;
