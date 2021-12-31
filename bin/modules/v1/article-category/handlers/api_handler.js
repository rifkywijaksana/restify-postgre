const wrapper = require('../../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const commandHandler = require('../repositories/command/command_handler');
const commandModel = require('../repositories/command/command_model');
const validator=require('../utils/validator');

const get = async (req, res) => {

  const get = async () => {
    return await queryHandler.get(req.query);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await get());
};


const getById = async (req, res) => {
  const getById = async () => {
    return await queryHandler.getById(req.params);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await getById());
};

const insert = async (req, res) => {

  const payload=req.body;
  const isValidPayload=validator.isValidPayload(payload,commandModel.insert);

  const insert = async (result) => {
    if(result.err){
      return result;
    }
    return await commandHandler.insert(payload);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await insert(isValidPayload));
};


module.exports = {
  insert,
  get,
  getById
};
