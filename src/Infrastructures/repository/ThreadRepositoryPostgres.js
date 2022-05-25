// const InvariantError = require('../../Commons/exceptions/InvariantError');
const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const AddedThread = require('../../Domains/threads/entities/AddedThread');
const AddedComment = require('../../Domains/threads/entities/AddedComment');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(addThread) {
    const { userId, title, body } = addThread;
    const owner = userId;

    const id = `thread-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5) RETURNING id, title, owner',
      values: [id, title, body, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedThread({ ...result.rows[0] });
  }

  async addComment(addComment) {
    const { userId, content, threadId } = addComment;
    const owner = userId;

    const id = `comment-${this._idGenerator()}`;
    const date = new Date().toISOString();

    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5) RETURNING id, content, owner',
      values: [id, content, threadId, owner, date],
    };

    const result = await this._pool.query(query);

    return new AddedComment({ ...result.rows[0] });
  }

  async findThread(threadId) {
    const findThreadQuery = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [threadId],
    };

    const findThreadResult = await this._pool.query(findThreadQuery);

    if (!findThreadResult.rowCount) {
      throw new NotFoundError('Thread not found, cannot add comment');
    }
  }

  async deleteComment(deleteComment) {
    const { commentId, threadId, userId } = deleteComment;

    const query = {
      text: 'UPDATE comments SET content = \'deleted\' WHERE id = $1 AND thread_id = $2 AND owner = $3 RETURNING *',
      values: [commentId, threadId, userId],
    };

    await this._pool.query(query);
  }

  async verifyComment(commentId, userId) {
    const findCommentQuery = {
      text: 'SELECT * from comments WHERE id = $1 AND content != \'deleted\'',
      values: [commentId],
    };

    const foundComment = await this._pool.query(findCommentQuery);

    if (!foundComment.rowCount) {
      throw new NotFoundError('Comment not found, fail to delete comment');
    }

    if (foundComment.rows[0].owner !== userId) {
      throw new AuthorizationError('Illegal access. Fail to delete comment');
    }
  }

  async getDetailThread(threadId) {
    const findThread = {
      text: 'SELECT threads.*, users.username FROM threads INNER JOIN users ON threads.owner = users.id WHERE threads.id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(findThread);

    const detail = result.rows[0];

    return detail;
  }

  async getThreadComments(threadId) {
    const findComments = {
      text: 'SELECT comments.id, users.username, comments.date, comments.content FROM comments INNER JOIN users ON comments.owner = users.id WHERE comments.thread_id = $1',
      values: [threadId],
    };

    const comments = await this._pool.query(findComments);

    return comments.rows;
  }
}

module.exports = ThreadRepositoryPostgres;
