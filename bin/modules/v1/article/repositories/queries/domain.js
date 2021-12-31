const query = require('./query');
const wrapper = require('../../../../../helpers/utils/wrapper');
const setup = require('../../../../../infra/configs/global_config');

class laporan {
  async get(data) {
    let dataDB = await query.get(data);
    
    let dataLaporan = dataDB.rows;
    
    let search = {};

    if(typeof data.search !== 'undefined'){
      search.search=data.search;
    }

    let dataLength=await query.get(search);
    let length= dataLength.rows.length;


    if (dataLaporan.length == 0){
      return wrapper.data2(400, dataDB.rows, dataDB.rows.length, 'Data Not Found');
    }
    return wrapper.data2(200, dataLaporan, length, 'Data Found');
  }

  async findById(data) {
    let dataDB = await query.findById(data);
    
    let dataLaporan = dataDB.rows;
    
    let length= dataLaporan.length;


    if (dataLaporan.length == 0){
      return wrapper.data2(400, dataDB.rows, dataDB.rows, 'Data Not Found');
    }
    return wrapper.data2(200, dataLaporan[0], length, 'Data Found');
  }
}

module.exports = laporan;
