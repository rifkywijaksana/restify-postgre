const wrapper = require('../../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const commandHandler = require('../repositories/command/command_handler');
const commandModel = require('../repositories/command/command_model');
const validator=require('../utils/validator');
const fileUploadHandler = require('../../../../helpers/components/file/fileUploadHandler');

const get = async (req, res) => {
  const get = async () => {
    return await queryHandler.get(req.query);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.pagination1(res, [] ,req, 0, result.code, result.message) :
      wrapper.pagination1(res, result.content,req,result.totalItems,result.code, result.message);
  };
  sendResponse(await get());
};

const findById = async (req, res) => {
  const findById = async () => {
    return await queryHandler.findById(req.params);
  };
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };
  sendResponse(await findById());
};

const insert = async (req, res) => {

  const payload=req.body;

  let filePayload = {};
  const sendResponse = (result) => {
    (result.err) ? wrapper.get(res, result.code, result.content, result.total, result.message) :
      wrapper.get(res, result.code, result.content, result.totalItems, result.message);
  };

  if((typeof(req.thumbnail) != 'undefined') || (req.thumbnail !== null) || (req.thumbnail !== '')) {
    let f = new fileUploadHandler;
    filePayload = await f.moveMinio('news', req);
    if(filePayload.err){
      return sendResponse(filePayload.path);
    }
    payload.thumbnail = filePayload.path;
  }

  if((typeof(req.file) != 'undefined') || (req.file !== null) || (req.file !== '')) {
    let f = new fileUploadHandler;
    payload.file = await f.moveMinio2('news', req);
    if(payload.file.err){
      return sendResponse(payload.file);
    }
  }

  const isValidPayload=validator.isValidPayload(payload,commandModel.create);

  payload.tokenId = req.userId;
  const insert = async (result) => {
    if(result.err){
      return result;
    }
    return await commandHandler.insert(payload);
  };


  sendResponse(await insert(isValidPayload));
};




module.exports = {
  get,
  findById,
  insert
};
