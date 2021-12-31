const faq = require('./domain');

const insert = async (data) => {
  const insert = async () => {
    const f = new faq;
    const result = await f.insert(data);
    return result;
  };
  const response = await insert();
  return response;
};


module.exports = {
  insert: insert
};
