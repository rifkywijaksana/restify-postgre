const { Client } = require('pg');
const config = require('../../../../../infra/configs/global_config');
const uuidv1 = require('uuid/v1');

const insert = async (data) => {
  console.log(data)
  data.id = uuidv1();
  const db = new Client(config.get('/postgreConfig'));
  db.connect();
  const query = `Insert into article (id, title, description, short_description, category_id, is_visible, image, created_at, created_by) values ('${data.id}', '${data.title}', '${data.description}', '${data.short_description}', '${data.category_id}', ${data.is_visible}, '${data.file}', now(), '${data.tokenId}')`;
  const recordset = await db.query(query);

  db.end();
  return recordset;
};


module.exports = {
  insert: insert
};

