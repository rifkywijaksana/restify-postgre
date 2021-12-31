const joi=require('joi');

const create = joi.object({
  title:joi.string().required().min(5),
  short_description:joi.string().required().min(10).max(100),
  description:joi.string().required().min(10),
  category_id:joi.string().required(),
  is_visible : joi.boolean().required(),
  image : joi.any(),
  thumbnail : joi.any(),
  file : joi.any(),
});

module.exports={
  create
};
