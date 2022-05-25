const pool = require('../../database/postgres/pool');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AccessTokenTestHelper = require('../../../../tests/AccessTokenTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/threads endpoint', () => {
  afterAll(async () => {
    await pool.end();
  });

  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and persisted thread', async () => {
      // Arrange
      // eslint-disable-next-line no-undef
      const server = await createServer(container);

      const requestPayload = {
        title: 'Thread 1',
        body: 'Body 1',
      };

      const accessToken = await AccessTokenTestHelper.getAccessToken('user-123');

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedThread).toBeDefined();
    });

    it('should response 400 when request payload not contain needed property', async () => {
      // Arrange
      const requestPayload = {
        title: 'title',
      };
      const server = await createServer(container);

      const accessToken = await AccessTokenTestHelper.getAccessToken('user-123');

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena properti yang dibutuhkan tidak ada');
    });

    it('should response 400 when request payload not meet data type specification', async () => {
      // Arrange
      const requestPayload = {
        title: 'dicoding',
        body: {},
      };
      const server = await createServer(container);
      const accessToken = await AccessTokenTestHelper.getAccessToken('user-123');
      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toEqual('tidak dapat membuat thread baru karena tipe data tidak sesuai');
    });
  });

  describe('when POST /threads/{threadId}/comments', () => {
    it('should response 201 and persisted comment', async () => {
      // Arrange
      const server = await createServer(container);

      const payload = {
        content: 'comment',
      };

      const accessToken = await AccessTokenTestHelper.getAccessToken('user-123');

      // create thread with helper

      const date = new Date().toISOString();

      await ThreadsTableTestHelper.addThread({
        id: 'thread-1', title: 'Thread Title', body: 'Body', owner: 'user-123', date,
      });

      // Action

      const response = await server.inject({
        method: 'POST',
        url: '/threads/thread-1/comments',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.addedComment).toBeDefined();
    });
  });

  describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should response 200 and delete comment', async () => {
      // Arrange
      const server = await createServer(container);

      const payload = {
        content: 'comment',
      };

      const accessToken = await AccessTokenTestHelper.getAccessToken('user-123');

      // create thread with helper

      const date = new Date().toISOString();

      await ThreadsTableTestHelper.addThread({
        id: 'thread-1', title: 'Thread Title', body: 'Body', owner: 'user-123', date,
      });

      await ThreadsTableTestHelper.addComment({
        id: 'comment-1', content: 'Comments', owner: 'user-123', threadId: 'thread-1', date,
      });

      // Action

      const response = await server.inject({
        method: 'DELETE',
        url: '/threads/thread-1/comments/comment-1',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });
  });

  describe('when GET /threads/{threadId}', () => {
    it('should response 200 and GET thread', async () => {
      // Arrange
      const server = await createServer(container);

      // create thread with helper

      const date = new Date().toISOString();

      await AccessTokenTestHelper.getAccessToken('user-123');

      await ThreadsTableTestHelper.addThread({
        id: 'thread-1', title: 'Thread Title', body: 'Body', owner: 'user-123', date,
      });

      await ThreadsTableTestHelper.addComment({
        id: 'comment-1', content: 'Comments', owner: 'user-123', threadId: 'thread-1', date,
      });

      await ThreadsTableTestHelper.addComment({
        id: 'comment-2', content: 'Comments', owner: 'user-123', threadId: 'thread-1', date,
      });

      // Action

      const response = await server.inject({
        method: 'GET',
        url: '/threads/thread-1',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });
  });
});
