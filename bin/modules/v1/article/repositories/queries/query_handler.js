const kegiatan = require('./domain');

const get = async (data) => {
  const get = async () => {
    const usr = new kegiatan;
    const result = await usr.get(data);
    return result;
  };
  const response = await get();
  return response;
};

const findById = async (data) => {
  const findById = async () => {
    const usr = new kegiatan;
    const result = await usr.findById(data);
    return result;
  };
  const response = await findById();
  return response;
};


module.exports = {
  get: get,
  findById : findById
};
