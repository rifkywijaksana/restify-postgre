const joi=require('joi');

const insert = joi.object({
  title:joi.string()
});


module.exports={
  insert
};
