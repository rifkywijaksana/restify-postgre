const command = require('./command');
const wrapper = require('../../../../../helpers/utils/wrapper');

class about {
  async insert(data) {
    let dbUpdate = await command.insert(data);
    let dataUpdate = dbUpdate.data;

    return wrapper.data2(200, dataUpdate, 'success', 'Success insert');
  }
}

module.exports = about;
