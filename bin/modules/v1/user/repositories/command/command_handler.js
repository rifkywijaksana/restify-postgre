const user = require('./domain');

const register = async (data) => {
  const register = async () => {
    const f = new user;
    const result = await f.register(data);
    return result;
  };
  const response = await register();
  return response;
};
module.exports = {
  register: register
};
