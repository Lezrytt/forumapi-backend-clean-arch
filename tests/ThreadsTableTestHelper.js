/* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const ThreadsTableTestHelper = {
  async addThread({
    id = 'thread-1', title = 'Thread Title', body = 'Body Thread', owner = 'user-123', date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO threads VALUES($1, $2, $3, $4, $5)',
      values: [id, title, body, owner, date],
    };

    await pool.query(query);
  },

  async addComment({
    id = 'comment-1', content = 'Comments', owner = 'user-123', threadId = 'thread-1', date = new Date().toISOString(),
  }) {
    const query = {
      text: 'INSERT INTO comments VALUES($1, $2, $3, $4, $5)',
      values: [id, content, threadId, owner, date],
    };

    await pool.query(query);
  },

  async findThreadsById(id) {
    const query = {
      text: 'SELECT * FROM threads WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findCommentById(id) {
    const query = {
      text: 'SELECT * from comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async deleteComment(id) {
    const query = {
      text: 'DELETE FROM comments WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async changeCommentOwner(commentId) {
    const query = {
      text: 'UPDATE comments SET owner = \'user-1239u0asdlklasdlijfeilao\' WHERE id = $1',
      values: [commentId],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM comments WHERE 1=1');
    await pool.query('DELETE FROM threads WHERE 1=1');
    await pool.query('DELETE FROM users WHERE 1=1');
  },
};

module.exports = ThreadsTableTestHelper;
