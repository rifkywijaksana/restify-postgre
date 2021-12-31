const config = require('../../../../../infra/configs/global_config');
const helper = require('../../../../../helpers/utils/common');
let md5 = require('md5');
const { Client } = require('pg');

const uuidv1 = require('uuid/v1');
const register = async (data) => {
    data.id = uuidv1();

    const db = new Client(config.get('/postgreConfig'));
    db.connect();

    
    const querycheck2 = `SELECT name FROM users WHERE email = '${data.email}'`;
    const recordcheck2 = await db.query(querycheck2);

    if(recordcheck2.rowCount > 0)
    {
      
        return recordcheck2;
    }
    
    const query = `INSERT INTO users (id,name,email,phone,password,created_at,is_user,is_active) values('${data.id}','${data.name}','${data.email}','${data.phone}', '${md5(data.password)}','now()',true,true)`;
    const recordset = await db.query(query);
    
    return recordset;
};


module.exports = {
    register
};
