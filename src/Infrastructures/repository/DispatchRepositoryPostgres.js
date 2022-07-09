// const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const DispatchRepository = require('../../Domains/dispatch/DispatchRepository');

class DispatchRepositoryPostgres extends DispatchRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addDispatch(addDispatch) {
    const { userId, dispatch } = addDispatch;

    const id = `dispatch-${this._idGenerator()}`;

    const query = {
      text: 'INSERT INTO dispatch VALUES($1, $2, $3) RETURNING id, owner, dispatch',
      values: [id, userId, dispatch],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getDispatch(userId) {
    const findDispatch = {
      text: 'SELECT * from dispatch WHERE owner = $1 ORDER BY dispatch.created_at DESC',
      values: [userId],
    };

    // console.log(`USER: ${userId}`);

    const dispatch = await this._pool.query(findDispatch);

    if (!dispatch.rowCount) {
      throw new NotFoundError('Cannot find dispatch. User do not exist');
    }

    return dispatch.rows[0];
  }
}

module.exports = DispatchRepositoryPostgres;
