const config = require('../../../../../infra/configs/global_config');
const { Client } = require('pg');
const uuidv1 = require('uuid/v1');

const insert = async (data) => {
  data.id = uuidv1();
  const db = new Client(config.get('/postgreConfig'));
  db.connect();
  const query = `INSERT INTO article_category (id,title)
  values('${data.id}','${data.title}')`;
  const recordset = await db.query(query);

  db.end();
  return recordset;
};


module.exports = {
  insert: insert
};

