const query = require('./query');
const wrapper = require('../../../../../helpers/utils/wrapper');

class about_us {
  async get(data) {

    let dataDB = await query.get(data);
    let dataAbout = dataDB.rows;

    if (dataAbout.length == 0){
      return wrapper.error("Not Found", 'Data Not Found',404);
    }
    return wrapper.data2(200, dataDB.rows, dataAbout.length, 'Data Found');
  }

  async getById(data) {

    let dataDB = await query.getById(data);
    let dataAbout = dataDB.rows;

    if (dataAbout.length == 0){
      return wrapper.error("Not Found", 'Data Not Found',404);
    }
    return wrapper.data2(200, dataDB.rows, dataAbout.length, 'Data Found');
  }
}

module.exports = about_us;
