const command = require('./command');
const wrapper = require('../../../../../helpers/utils/wrapper');
const logger = require('../../../../../helpers/utils/logger');
const sgMail = require('@sendgrid/mail');
const uuidv1 = require('uuid/v1');
const axios = require('axios')
const queryUser = require('../queries/query_handler')
class user {

  async register(data) {
    let dbInsert = await command.register(data);
        
    if(dbInsert.command == "SELECT" && dbInsert.rowCount > 0)
      return wrapper.error("User already exist", 'Data With the same email already exist',409);

    return wrapper.data2(200, data, 1, 'Register Success');
  }

}

module.exports = user;
