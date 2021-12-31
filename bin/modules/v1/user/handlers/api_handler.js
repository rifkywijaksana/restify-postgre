const wrapper = require('../../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/command/command_handler');
const queryHandler = require('../repositories/queries/query_handler');
const commandModel = require('../repositories/command/command_model');
const validator = require('../utils/validator');

const login = async (req, res) => {
    const payload = req.body;

    const isValidPayload = await validator.isValidPayload(payload, commandModel.auth);

    const login = async (result) => {
        if (result.err) {
            return result;
        }
        return await queryHandler.login(payload);
    };
    const sendResponse = (result) => {
        result.err
            ? wrapper.get1(res, result.code, result.content, result.total, result.message)
            : wrapper.get1(res, result.code, result.content, result.totalItems, result.message);
    };
    sendResponse(await login(isValidPayload));
};


const register = async (req, res) => {
    const payload = req.body;
    const isValidPayload = validator.isValidPayload(payload, commandModel.register);

    const register = async (result) => {
        if (result.err) {
            return result;
        }
        return await commandHandler.register(payload);
    };
    const sendResponse = (result) => {
        result.err
            ? wrapper.get1(res, result.code, result.content, result.total, result.message)
            : wrapper.get1(res, result.code, result.content, result.totalItems, result.message);
    };

    sendResponse(await register(isValidPayload));
};
module.exports = {
    login:login,
    register:register
};
