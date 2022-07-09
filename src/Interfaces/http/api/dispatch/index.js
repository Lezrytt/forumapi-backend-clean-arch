const DispatchHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'dispatch',
  register: async (server, { container }) => {
    const dispatchHandler = new DispatchHandler(container);
    server.route(routes(dispatchHandler));
  },
};
