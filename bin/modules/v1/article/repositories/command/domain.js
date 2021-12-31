const command = require('./command');
const wrapper = require('../../../../../helpers/utils/wrapper');

class faq {
  async insert(data) {
    let dbInsert = await command.insert(data);
    let dataInsert = dbInsert.rows;
    return wrapper.data2(200, dataInsert, 'success', 'Success Insert');
  }

}

module.exports = faq;
