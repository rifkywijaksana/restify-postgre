const crypto = require('crypto');
let md5 = require('md5');
const { Client } = require('pg');
const config = require('../../../../../infra/configs/global_config');
const helper = require('../../../../../helpers/utils/common');

const login = async (data) => {
    const db = new Client(config.get('/postgreConfig'));
    db.connect();

    const query = `SELECT * FROM users WHERE email = '${data.email}' and password = '${md5(data.password)}' and is_active=true`;
    const recordset = await db.query(query);
    db.end();
    return recordset;
  };


module.exports = {
    login:login
};
