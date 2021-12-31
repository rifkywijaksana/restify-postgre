const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('../../../../helpers/utils/wrapper');

const isValidPayload = (payload, constraint)=>{
  const {error}=joi.validate(payload,constraint);
  return (!validate.isEmpty(error))?wrapper.error('fail',error,409):wrapper.data('success','valid param',200);
};

module.exports={
  isValidPayload
};

