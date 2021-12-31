let fs = require('fs');
let fileExtension = require('file-extension');
const uuidv1 = require('uuid/v1');
const minioHelper = require('../../utils/minio');
const validator = require('../../utils/validator');
const logger = require('../../utils/logger');
const helper = require('../../../helpers/utils/common')

class fileUploadHandler {
    async move(path, req) {
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return '';
        }

        if (Object.keys(req.files).length == 0) {
            return '';
        }

        let new_file_name = '';

        let d = new Date();
        let strtime = d.getTime();

        new_file_name = strtime + '_' + uuidv1() + '.' + fileExtension(req.files.imgFile.name);
        let file_location = path + '/' + new_file_name;

        fs.copyFile(req.files.imgFile.path, './uploads/' + file_location, (err) => {
            if (err) {
                return '';
            }
            fs.unlinkSync(req.files.imgFile.path);
        });

        return './uploads/' + file_location;
    }

    async moveMinio(bucketName, req) {
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return '';
        }

        if (Object.keys(req.files).length == 0) {
            return '';
        }

        // const isLimitSize = validator.isLimitSize(req.files.image, 'image');
        // if (isLimitSize.err) {
        //     return isLimitSize;
        // }

        let newFileName = `${bucketName}_${uuidv1()}.${fileExtension(req.files.image.name)}`;
        let fileLocation = `${bucketName}/${newFileName}`;
        minioHelper.init();

        let uploadFile = await minioHelper.objectUpload(
            bucketName,
            newFileName,
            req.files.image.path
        );
        
        if (uploadFile.err == null) {
            return {
                path: fileLocation,
                file_name: newFileName,
            };
        } else {
            logger.log(
                'fileuploadHandler.moveMinio',
                JSON.stringify(uploadFile.code),
                'error upload file'
            );
            return uploadFile;
        }
    }

    async moveMinio2(bucketName, req) {
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return '';
        }

        if (Object.keys(req.files).length == 0) {
            return '';
        }

        // const isLimitSize = validator.isLimitSize(req.files.imgFile2, 'imgFile2');
        // if (isLimitSize.err) {
        //     return isLimitSize;
        // }

        let newFileName = `${bucketName}_${uuidv1()}.${fileExtension(req.files.image.name)}`;
        let fileLocation = `${bucketName}/${newFileName}`;
        minioHelper.init();
        await minioHelper.objectUpload(bucketName, newFileName, req.files.image.path);

        return fileLocation;
    }

    async moveMinio3(bucketName, req) {
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return '';
        }

        if (Object.keys(req.files).length == 0) {
            return '';
        }

        let userId = '';
        if(!helper.isEmpty(req.userId)){
            userId = `${req.userId}_`;
        }

        let jenisLayanan = '';
        if(!helper.isEmpty(req.jenisLayanan)){
            jenisLayanan = `${req.jenisLayanan}_`;
        }

        const isLimitSize = validator.isLimitSize(req.files.imgFile, 'imgFile');
        if (isLimitSize.err) {
            return isLimitSize;
        }

        let d = new Date();
        let strtime = d.getTime();

        let newFileName = `${userId}${jenisLayanan}${strtime}.${fileExtension(req.files.imgFile.name)}`;
        let fileLocation = `${bucketName}/${newFileName}`;
        minioHelper.init();

        let uploadFile = await minioHelper.objectUpload(
            bucketName,
            newFileName,
            req.files.imgFile.path
        );
        if (uploadFile.err == null) {
            return {
                path: fileLocation,
                file_name: newFileName,
            };
        } else {
            logger.log(
                'fileuploadHandler.moveMinio3',
                JSON.stringify(uploadFile.code),
                'error upload file'
            );
            return uploadFile;
        }
    }

    async moveArray(path, req) {
        let _return = [];
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return _return;
        }

        if (Object.keys(req.files).length == 0) {
            return _return;
        }

        let data = req.files;
        let keys = Object.keys(data);

        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                let new_file_name = '';
                let d = new Date();
                let strtime = d.getTime();

                new_file_name =
                    'TEST_' + strtime + '_' + uuidv1() + '.' + fileExtension(data[keys[i]].name);
                let file_location = path + '/' + new_file_name;

                fs.copyFile(data[keys[i]].path, './uploads/' + file_location, (err) => {
                    if (err) {
                        console.log(err)
                    }
                });

                _return.push({
                    name: req.body['name[' + i + ']'],
                    tipe: req.body['tipe[' + i + ']'],
                    path: './uploads/' + file_location,
                    file_type: fileExtension(data[keys[i]].name),
                    file_size: data[keys[i]].size,
                });
            }
        }

        return _return;
    }

    async moveArrayMinio(bucketName, req) {
        let _return = [];
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return _return;
        }

        if (Object.keys(req.files).length == 0) {
            return _return;
        }

        let data = req.files;
        let keys = Object.keys(data);

        if (keys.length > 0) {
            for (let i = 0; i < keys.length; i++) {
                const isLimitSize = validator.isLimitSize(data[keys[i]], keys[i]);
                if (isLimitSize.err) {
                    return isLimitSize;
                }
            }

            for (let i = 0; i < keys.length; i++) {
                let d = new Date();
                let strtime = d.getTime();

                let productType = '';
                if (req.body.product_test_type) {
                    let textbracket = req.body.product_test_type.match(/\(([^)]+)\)/);
                    if (textbracket) {
                        productType = textbracket[1];
                    } else {
                        productType = req.body.product_test_type.replace(/ /g, '_');
                    }
                }

                let type = '';
                if (req.body['tipe[' + i + ']']) {
                    type = req.body['tipe[' + i + ']'].replace(/ /g, '-');
                }
                let newFileName = `${strtime}_${productType}_${type}_${uuidv1()}.${fileExtension(
                    data[keys[i]].name
                )}`;
                let fileLocation = `${bucketName}/${newFileName}`;

                minioHelper.init();
                await minioHelper.objectUpload('attachment', newFileName, data[keys[i]].path);

                _return.push({
                    name: req.body['name[' + i + ']'],
                    tipe: req.body['tipe[' + i + ']'],
                    path: fileLocation,
                    file_name: newFileName,
                    file_type: fileExtension(data[keys[i]].name),
                    file_size: data[keys[i]].size,
                });
            }
        }

        return _return;
    }

    async move1(path, reqObjectName) {
        if (typeof reqObjectName == 'undefined' || reqObjectName === null || reqObjectName == '') {
            return '';
        }

        if (Object.keys(reqObjectName).length == 0) {
            return '';
        }

        let new_file_name = '';

        let d = new Date();
        let strtime = d.getTime();

        new_file_name = strtime + '_' + uuidv1() + '.' + fileExtension(reqObjectName.name);
        let file_location = path + '/' + new_file_name;

        fs.copyFile(reqObjectName.path, './uploads/' + file_location, (err) => {
            if (err) {
                return '';
            }
            fs.unlinkSync(reqObjectName.path);
        });

        return './uploads/' + file_location;
    }

    async getSize(req) {
        let __return = 0;
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return __return;
        }
        return req.files.imgFile.size;
    }

    async getExt(req) {
        let __return = '';
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return __return;
        }

        return fileExtension(req.files.imgFile.name);
    }

    async remove(filePath) {
        minioHelper.init();
        const file = filePath.split('/');
        const removeAction = await minioHelper.objectRemove(file[0], file[1]);
    }

    async uploadMinio(bucketName, req) {
        if (typeof req.files == 'undefined' || req.files === null || req.files == '') {
            return '';
        }

        if (Object.keys(req.files).length == 0) {
            return '';
        }

        const isLimitSize = validator.isLimitSize(req.files.imgFile, 'imgFile');
        if (isLimitSize.err) {
            return isLimitSize;
        }
        
        let file_type = 'lampiran_';

        if(helper.isEmpty(req.body.file_type)){
            file_type = req.body.file_type + '_';
        }

        let service = '';
        if(!helper.isEmpty(req.body.service)){
            service = req.body.service + '_';
        }

        var today = new Date();
        var date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
        var time = today.getHours() + "" + today.getMinutes() + "" + today.getSeconds();
        var dateTime = date+'_'+time;

        let productName = ``;
        if(!helper.isEmpty(req.body.product_name)){
            productName = req.body.product_name.replace(' ', '_') + '_';
        }

        let newFileName = `${file_type}${service}${productName}${dateTime}.${fileExtension(req.files.imgFile.name)}`.toLowerCase();
        let fileLocation = `${bucketName}/${newFileName}`;
        minioHelper.init();

        let uploadFile = await minioHelper.objectUpload(
            bucketName,
            newFileName,
            req.files.imgFile.path
        );
        
        if (uploadFile.err == null) {
            return {
                path: fileLocation,
                file_name: newFileName,
            };
        } else {
            logger.log(
                'fileuploadHandler.uploadMinio',
                JSON.stringify(uploadFile.code),
                'error send file to minio'
            );
            return uploadFile;
        }
    }
}

module.exports = fileUploadHandler;
