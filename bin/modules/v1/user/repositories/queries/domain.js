const query = require('./query');
const wrapper = require('../../../../../helpers/utils/wrapper');
const helper = require('../../../../../helpers/utils/common');
const jwtHelper = require("../../../../../auth/jwt_auth_helper");
const jwt = require("jsonwebtoken");
const setup = require('../../../../../infra/configs/global_config');

class user {
    async login(data) {
        let dbData = await query.login(data);
            let user_data = dbData.rows;
            if(user_data.length > 0){
                let userId = {
                    id : user_data[0].id
                }

                let userData = {
                    err: null,
                    message: '',
                    data:user_data
                }
                
                const token = await jwtHelper.generateToken(userData);

                const { iat, exp } = jwt.decode(token);
                userData.data[0].iat = iat;
                userData.data[0].exp = exp;
                userData.data[0].token = token;

                return wrapper.data2(200, user_data, user_data.length, 'Success Login');
            }
            return wrapper.data2(400, user_data, 0, 'User not found');
    }
}

module.exports = user;
