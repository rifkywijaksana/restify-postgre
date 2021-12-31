const config = require('../../../../../infra/configs/global_config');
const helper = require('../../../../../helpers/utils/common');

const { Client } = require('pg');
const get = async (data) => {
  const db = new Client(config.get('/postgreConfig'));
  db.connect();
  let query = 'SELECT * FROM article_category';

  const recordset = await db.query(query);


  db.end();
  return recordset;
};

const getById = async (data) => {
  const db = new Client(config.get('/postgreConfig'));
  db.connect();
  let query = `SELECT * FROM article_category
  WHERE id = '${data.id}'`;

  const recordset = await db.query(query);


  db.end();
  return recordset;
};

module.exports = {
  get: get,
  getById:getById
};
