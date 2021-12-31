const aboutUs = require('./domain');

const get = async (data) => {
  const get = async () => {
    const usr = new aboutUs;
    const result = await usr.get(data);
    return result;
  };
  const response = await get();
  return response;
};

const getById = async (data) => {
  const getById = async () => {
    const usr = new aboutUs;
    const result = await usr.getById(data);
    return result;
  };
  const response = await getById();
  return response;
};
module.exports = {
  get: get,
  getById:getById
};
