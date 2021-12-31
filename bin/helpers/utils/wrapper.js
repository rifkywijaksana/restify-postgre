const data = (data, description = "", code = 200) => ({
    err: null,
    message: description,
    data,
    code,
});

const paginationData = (data, meta, description = "", code = 200) => ({
    err: null,
    message: description,
    data,
    meta,
    code,
});

const error = (err, description, code = 500) => ({
    err,
    code,
    data: "",
    message: description,
});

const data2 = (code, content = null, totalItems = 0, message) => {
    return {
        err: null,
        code: code,
        content: content,
        totalItems: totalItems,
        message: message,
    };
};

const response = (res, type, result, message, code) => {
    /* eslint no-param-reassign: 2 */
    if (message) {
        result.message = message;
    }
    if (code) {
        result.code = code;
    }
    let status;
    switch (type) {
        case "fail":
            status = false;
            break;
        case "success":
            status = true;
            break;
        default:
            status = true;
            break;
    }
    res.send(result.code, {
        success: status,
        data: result.data,
        message: result.message,
        code: result.code,
    });
};

const paginationResponse = (res, type, result, message = null, code = null) => {
    if (message) {
        result.message = message;
    }
    if (code) {
        result.code = code;
    }
    let status;
    switch (type) {
        case "fail":
            status = "fail";
            break;
        case "success":
            status = "success";
            break;
        default:
            status = "error";
            break;
    }
    res.send(result.code, {
        status,
        data: result.data,
        meta: result.meta,
        code: result.code,
        message: result.message,
    });
};

const get = (res, code, content, total, message) => {
    res.send({
        code: code,
        content: content,
        totalItems: total,
        message: message,
    });
};

const pagination = (res, data, req, totalData, code, message) => {
    let totalPage = 1;
    let total = 0;
    if (req.query.size !== null) {
        if (totalData > req.query.size) {
            total = req.query.size / totalData;
            totalPage = parseInt(total);
        }
    }
    res.send({
        code: code,
        content: data,
        meta: {
            page: req.query.page !== null ? req.query.page : 0,
            size: req.query.size !== null ? req.query.size : 0,
            totalPage: totalPage,
            totalData: totalData,
        },
        message: message,
    });
};

const pagination1 = (res, data, req, totalData, code, message) => {
    let totalPage = 1;
    let total = 0;
    if (req.query.size !== null) {
        if (totalData > req.query.size) {
            total = totalData / req.query.size;
            totalPage = Math.ceil(total);
        }
    }
    let page = req.query.page !== null ? req.query.page : 0;
    let size = req.query.size !== null ? req.query.size : 0;

    let showFrom = ((page-1) * size) + 1;
    res.send({
        code: code,
        content: data,
        meta: {
            page: page,
            size: size,
            show: page * size > totalData ? totalData : page * size,
            show_from: showFrom,
            show_to: page * size > totalData ? totalData : page * size,
            totalPage: totalPage,
            totalData: totalData,
        },
        message: message,
    });
};

const get1 = (res, code, content, total, message) => {
    res.send(code, {
        code: code,
        content: content,
        totalItems: total,
        message: message,
    });
};
module.exports = {
    data,
    paginationData,
    error,
    response,
    paginationResponse,
    get,
    data2,
    pagination,
    pagination1,
    get1,
};
