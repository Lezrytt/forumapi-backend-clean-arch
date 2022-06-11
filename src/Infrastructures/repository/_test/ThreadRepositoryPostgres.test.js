// const InvariantError = require('../../../Commons/exceptions/InvariantError');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPosgres = require('../ThreadRepositoryPostgres');
const AddThread = require('../../../Domains/threads/entities/AddThread');
const AddedThread = require('../../../Domains/threads/entities/AddedThread');
const AddComment = require('../../../Domains/threads/entities/AddComment');
const AddedComment = require('../../../Domains/threads/entities/AddedComment');
const ThreadsTableTestHelper = require('../../../../tests/ThreadsTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const UserRepositoryPostgres = require('../UserRepositoryPostgres');
const RegisterUser = require('../../../Domains/users/entities/RegisterUser');
const DeleteComment = require('../../../Domains/threads/entities/DeleteComment');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should persist add thread', async () => {
    // Arrange
      const addThread = new AddThread('user-1', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '1'; // stub

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);

      // assert
      const thread = await ThreadsTableTestHelper.findThreadsById('thread-1');
      expect(thread).toHaveLength(1);
    });

    it('should return added thread correctly', async () => {
      // Arrange
      const addThread = new AddThread('user-1', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '1'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      const addedThread = await threadRepositoryPostgres.addThread(addThread);

      // assert
      expect(addedThread).toStrictEqual(new AddedThread({
        id: 'thread-1',
        title: 'Thread Title',
        body: 'Thread Body',
        owner: 'user-1',
      }));
    });
  });

  describe('addComment function', () => {
    it('should persist add comment', async () => {
    // Arrange
      const addThread = new AddThread('user-123', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const addComment = new AddComment({
        userId: 'user-123',
        content: 'comment',
        threadId: 'thread-123',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '123'; // stub

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);
      await threadRepositoryPostgres.addComment(addComment);

      // assert

      const thread = await ThreadsTableTestHelper.findCommentById('comment-123');
      expect(thread).toHaveLength(1);
    });

    it('should throw error if thread not found when AddComment', async () => {
    // Arrange
      const addThread = new AddThread('user-123', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      // different thread id 123 != 12
      const addComment = new AddComment({
        userId: 'user-123',
        content: 'comment',
        threadId: 'thread-12',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '123'; // stub

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);

      // assert
      await expect(threadRepositoryPostgres.findThread(addComment.threadId))
        .rejects
        .toThrowError('Thread not found');
    });

    it('should not throw error if thread is found', async () => {
    // Arrange
      const addThread = new AddThread('user-123', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      // the same thread id with thread
      const addComment = new AddComment({
        userId: 'user-123',
        content: 'comment',
        threadId: 'thread-123',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '123'; // stub

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);

      // assert
      await expect(threadRepositoryPostgres.findThread(addComment.threadId))
        .resolves;
    });

    it('should return added comment correctly', async () => {
      // Arrange
      const addThread = new AddThread('user-123', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const addComment = new AddComment({
        userId: 'user-123',
        content: 'comment',
        threadId: 'thread-123',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const fakeIdGenerator = () => '123'; // stub
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);
      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);
      const addedComment = await threadRepositoryPostgres.addComment(addComment);

      // assert
      expect(addedComment).toStrictEqual(new AddedComment({
        id: 'comment-123',
        content: 'comment',
        owner: 'user-123',
      }));
    });
  });

  describe('deleteComment function', () => {
    it('should delete comment correctly', async () => {
    // Arrange
      const addThread = new AddThread('user-123', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const addComment = new AddComment({
        userId: 'user-123',
        content: 'comment',
        threadId: 'thread-123',
      });
      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const deleteComment = new DeleteComment('comment-123', 'thread-123', 'user-123');

      const fakeIdGenerator = () => '123'; // stub

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);
      await threadRepositoryPostgres.addComment(addComment);
      await threadRepositoryPostgres.deleteComment(deleteComment);

      // assert

      const thread = await ThreadsTableTestHelper.findCommentById('comment-123');
      expect(thread).toHaveLength(1);
      expect(thread[0].content).toStrictEqual('deleted');
    });
    it('should throw error if comment already deleted', async () => {
    // Arrange
      const addThread = new AddThread('user-123', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const addComment = new AddComment({
        userId: 'user-123',
        content: 'comment',
        threadId: 'thread-123',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const deleteComment = new DeleteComment('comment-123', 'thread-123', 'user-123');

      const fakeIdGenerator = () => '123'; // stub

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);
      await threadRepositoryPostgres.addComment(addComment);

      await ThreadsTableTestHelper.deleteComment('comment-123');
      // assert
      await expect(threadRepositoryPostgres.verifyComment(deleteComment.commentId, deleteComment.userId))
        .rejects
        .toThrowError('Cannot verify comment. Comment do not exist');
      await expect(threadRepositoryPostgres.verifyComment(deleteComment.commentId, deleteComment.userId))
        .rejects
        .toThrow(NotFoundError);
    });
    it('should throw error if delete other people comment', async () => {
      // Arrange
      const addThread = new AddThread('user-123', {
        title: 'Thread Title',
        body: 'Thread Body',
      });

      const registerUser = new RegisterUser({
        username: 'dicoding',
        password: 'secret_password',
        fullname: 'Dicoding Indonesia',
      });

      const deleteComment = new DeleteComment('comment-111', 'thread-123', 'user-123');

      const fakeIdGenerator = () => '123'; // stub

      const userRepositoryPostgres = new UserRepositoryPostgres(pool, fakeIdGenerator);
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      // action
      await userRepositoryPostgres.addUser(registerUser);
      await threadRepositoryPostgres.addThread(addThread);

      await UsersTableTestHelper.addUser({
        id: 'user-111', username: 'usernameee', password: 'pwpwpwpw', fullname: 'namamama',
      });
      await ThreadsTableTestHelper.addComment({ id: 'comment-111', threadId: 'thread-123', owner: 'user-111' });

      // assert
      await expect(threadRepositoryPostgres.verifyComment(deleteComment.commentId, deleteComment.userId))
        .rejects
        .toThrowError('Illegal access. Comment owner and user do not match!');
      await expect(threadRepositoryPostgres.verifyComment(deleteComment.commentId, deleteComment.userId))
        .rejects
        .toThrow(AuthorizationError);
    });
    describe('verifyComment function', () => {
      it('should not throw error if comment does exist', async () => {
        // Arrange
        const payload = {
          commentId: 'comment-123',
          userId: 'user-123',
        };

        const fakeIdGenerator = '123';

        const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

        await UsersTableTestHelper.addUser({ id: 'user-123' });
        await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123', date: 'date' });
        await ThreadsTableTestHelper.addComment({ id: payload.commentId, owner: payload.userId, threadId: 'thread-123' });

        // action
        await expect(threadRepositoryPostgres.verifyComment(payload.commentId, payload.userId))
          .resolve;
      });
      it('should throw error if comment do not exist', async () => {
        // Arrange
        const payload = {
          commentId: 'comment-123',
          userId: 'user-123',
        };

        const fakeIdGenerator = '123';
        const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

        // action
        await expect(threadRepositoryPostgres.verifyComment(payload.commentId, payload.userId))
          .rejects
          .toThrow(NotFoundError);
      });
    });
  });
  describe('getDetailThread function', () => {
    it('should get thread correctly', async () => {
      const payload = {
        threadId: 'thread-123',
      };

      const expectedThread = {
        id: 'thread-123',
        title: 'Thread Title',
        body: 'Body Thread',
        owner: 'user-123',
        date: 'date',
        username: 'dicoding',
      };

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123', date: 'date' });

      const fakeIdGenerator = '123';
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      const thread = await threadRepositoryPostgres.getDetailThread(payload.threadId);

      expect(thread).toStrictEqual(expectedThread);
    });
  });
  describe('getThreadComments function', () => {
    it('should get comments in thread correctly', async () => {
      const payload = {
        threadId: 'thread-123',
      };

      const expectedComments = [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: 'date',
          content: 'content',
        },
        {
          id: 'comment-124',
          username: 'dicoding',
          date: 'date',
          content: 'content',
        }];

      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await ThreadsTableTestHelper.addThread({ id: 'thread-123', owner: 'user-123', date: 'date' });
      await ThreadsTableTestHelper.addComment({
        id: 'comment-123', content: 'content', date: 'date', threadId: 'thread-123',
      });
      await ThreadsTableTestHelper.addComment({
        id: 'comment-124', content: 'content', date: 'date', threadId: 'thread-123',
      });

      const fakeIdGenerator = '123';
      const threadRepositoryPostgres = new ThreadRepositoryPosgres(pool, fakeIdGenerator);

      const comments = await threadRepositoryPostgres.getThreadComments(payload.threadId);

      expect(comments).toEqual(expectedComments);
    });
  });
});
