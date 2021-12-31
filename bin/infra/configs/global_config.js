require('dotenv').config();
const confidence = require('confidence');
const path = require('path');

const config = {
    host: process.env.APP_HOST || 'http://localhost',
    env: process.env.APP_ENV || 'DEV',
    port: process.env.PORT,
    publicKey: process.env.PUBLIC_KEY_PATH,
    privateKey: process.env.PRIVATE_KEY_PATH,
    jwt: {
        secret: process.env.JWT_SECRET || 'itdri-website',
    },
    frontendUrl: process.env.FE_DOMAIN || 'itdri.id',
    postgreConfig:{
        host: process.env.POSTGRE_HOST, 
        port: process.env.POSTGRE_PORT,
        database: process.env.POSTGRE_DATABASE,
        user: process.env.POSTGRE_USER,
        password: process.env.POSTGRE_PASSWORD,
        // ssl: true,
        ssl: { rejectUnauthorized: false }
    },
    minio: {
        url: process.env.MINIO_URL,
        endPoint: '149.129.247.151',
        port: process.env.MINIO_PORT || 9000,
        useSSL: false,
        accessKey: process.env.MINIO_ACCESSKEY,
        secretKey: process.env.MINIO_SECRETKEY,
    }
};
const store = new confidence.Store(config);

exports.get = (key) => store.get(key);
