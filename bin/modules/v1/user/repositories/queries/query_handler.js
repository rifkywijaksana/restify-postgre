const user = require('./domain');
const login = async (data) => {
    const login = async () => {
      const usr = new user;
      const result = await usr.login(data);
      return result;
    };
    const response = await login();
    return response;
  };
module.exports = {
    login:login
};
