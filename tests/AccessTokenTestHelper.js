/* istanbul ignore file */
const Jwt = require('@hapi/jwt');
const UsersTableTestHelper = require('./UsersTableTestHelper');

const AccessTokenTestHelper = {
  async getAccessToken(userId = 'user-123', username = 'dicoding') {
    const payload = {
      id: userId,
      username,
      password: 'secret',
      fullname: 'Dicoding Indonesia',
    };

    await UsersTableTestHelper.addUser(payload);
    return Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY);
  },
};

module.exports = AccessTokenTestHelper;
