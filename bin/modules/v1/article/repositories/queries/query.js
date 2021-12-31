const { Client } = require('pg');
const config = require('../../../../../infra/configs/global_config');

const get = async (data) => {
  const db = new Client(config.get('/postgreConfig'));
  
  let minioHost = config.get('/minio').url;
  db.connect();
  let query = `select a.id , a.title , a.short_description , a.description ,concat('${minioHost}',a.image) image, a.created_at , u.name created_by, ac.title category
  from article a left join article_category ac on ac.id =a.category_id 
  left join users u on u.id = a.created_by where is_visible=true `;
  if((typeof data.search !== 'undefined')){
    query += `AND (a.title like '%${data.search}%' or a.short_description like '%${data.search}%' or a.description like '%${data.search}%')`;
  }
  query += `order by created_at desc`;

  if((typeof data.size !== 'undefined') && (typeof data.page !== 'undefined')){
    let offset = (data.page - 1) * data.size;
    query += ` limit ${data.size} offset ${offset}`;
  }
  const recordset = await db.query(query);


  db.end();
  return recordset;
};

const findById = async (data) => {
  const db = new Client(config.get('/postgreConfig'));
  let minioHost = config.get('/minio').url;
  db.connect();
  const query = `select a.id , a.title , a.short_description , a.description ,concat('${minioHost}',a.image) image, a.created_at , u.name created_by, ac.title category
  from article a left join article_category ac on ac.id =a.category_id 
  left join users u on u.id = a.created_by  where a.id = '${data.id}' AND  is_visible=true`;
  const recordset = await db.query(query);


  db.end();
  return recordset;
};


module.exports = {
  get: get,
  findById : findById
};
