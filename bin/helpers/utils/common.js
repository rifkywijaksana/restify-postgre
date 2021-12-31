const crypto = require("crypto");

const getLastFromURL = async (url) => {
    let name = decodeURI(url).split("/").pop();
    name = name.replace(/(\r\n|\n|\r)/gm, "");
    return String(name);
};

const encrypt = async (text, algorithm, secretKey) => {
    const cipher = crypto.createCipher(algorithm, secretKey);
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
};

const decrypt = async (text, algorithm, secretKey) => {
    const decipher = crypto.createDecipher(algorithm, secretKey);
    let dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
};

const isEmpty = (value) => {
    return (
        (typeof value == "string" && !value.trim()) ||
        typeof value == "undefined" ||
        value === null
    );
};

const isEmptyFiles = (value) => {
    if((typeof(value) != 'undefined') || (value !== null) || (value !== '') || (typeof value != undefined) || (Object.keys(value).length) > 0){
        return false;
    }
    return true;
}

module.exports = {
    getLastFromURL,
    encrypt,
    decrypt,
    isEmpty,
    isEmptyFiles,
};
