const joi=require('joi');

const register=joi.object({
  name:joi.string().min(3).required(),
  phone: joi.string().min(10).regex(/^08[0-9]*$/).required(),
  email:joi.string().email({minDomainAtoms:2}).required(),
  password:joi.string().required()
});

const auth = joi.object({
  email: joi.string().email({ minDomainAtoms: 2 }).required(),
  password: joi.string().required()
});


module.exports={
  register,
  auth
};
