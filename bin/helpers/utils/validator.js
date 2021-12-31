const wrapper = require('./wrapper');

const isLimitSize=(payload, file_name)=>{
  let error = '';
  if(payload.type == 'image/jpeg' || payload.type == 'image/png' || payload.type == 'image/gif'){
    const file_size = Number(payload.size / 1048578).toFixed(2);
    if(file_size > 5){
      error = {
        name: 'ValidationError',
        details: [
          {
            message: `'${file_name} maximum image size is 5 MB`,
            path: [
              file_name
            ],
            type: 'file.size',
            context: {
              limit: 5,
              value: Number(file_size),
              key: file_name,
              label: file_name
            }
          }
        ]
      };
    }
  }

  if(error){
    return wrapper.error('fail', error, 409);
  }
  return wrapper.data('success', 'valid param', 200);
};

module.exports={
  isLimitSize
};

