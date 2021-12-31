const jwt = require("jsonwebtoken");
const fs = require("fs");
const config = require("../infra/configs/global_config");
// const userQuery = require('../modules/user/repositories/queries/query')

const wrapper = require("../helpers/utils/wrapper");
const { ERROR } = require("../helpers/http-error/custom_error");

const getKey = (keyPath) => fs.readFileSync(keyPath, "utf8");

const generateToken = async (payload) => {
    const privateKey = getKey(config.get("/privateKey"));
    const verifyOptions = {
        algorithm: "RS256",
        audience: "97b33193-43ff-4e58-9124-b3a9b9f72c34",
        issuer: "telkomdev",
        expiresIn: "43200m", // 30D
    };
    const token = jwt.sign(payload, privateKey, verifyOptions);
    return token;
};

const getToken = (headers) => {
    if (
        headers &&
        headers.authorization &&
        headers.authorization.includes("Bearer")
    ) {
        const parted = headers.authorization.split(" ");
        if (parted.length === 2) {
            return parted[1];
        }
    }
    return undefined;
};

const verifyToken = async (req, res, next) => {
    const result = {
        data: null,
    };
    const publicKey = fs.readFileSync(config.get("/publicKey"), "utf8");
    const verifyOptions = {
        algorithm: "RS256",
        audience: "97b33193-43ff-4e58-9124-b3a9b9f72c34",
        issuer: "telkomdev",
    };

    const token = getToken(req.headers);

    if (!token) {
        return wrapper.response(
            res,
            "failed",
            result,
            "Invalid token!",
            ERROR.FORBIDDEN
        );
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, publicKey, verifyOptions);
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return wrapper.response(
                res,
                "failed",
                result,
                "Access token expired!",
                ERROR.UNAUTHORIZED
            );
        }
        return wrapper.response(
            res,
            "failed",
            result,
            "Invalid token!",
            ERROR.UNAUTHORIZED
        );
    }
    const userData = decodedToken.data;
    const userId = userData[0].id;
    // const userEmail = userData[0].email;

    // const user = await userQuery.findById(userId);
    // if (user.err) {
    //     wrapper.response(
    //         res,
    //         "failed",
    //         result,
    //         "Invalid token!",
    //         ERROR.UNAUTHORIZED
    //     );
    // }
    req.userId = userId;
    req.email = userData[0].email;
    req.name = userData[0].name;
    // req.userEmail = userData[0];
    // req.userName = userData[0];
    // req.params.userId = userId;
    // req.params.userEmail = userData[0].email;
    // // req.body.userEmail = userData[0].email;
    // // req.body.userId = userId;
    next();
};


module.exports = {
    generateToken,
    verifyToken
};
