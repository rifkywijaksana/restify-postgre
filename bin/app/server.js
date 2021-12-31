
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const users = require('../modules/v1/user/handlers/api_handler');
const article_category = require('../modules/v1/article-category/handlers/api_handler');
const article = require('../modules/v1/article/handlers/api_handler');
const morgan = require('morgan');
var restifySwaggerJsdoc = require('restify-swagger-jsdoc');

const cors = corsMiddleware({
  preflightMaxAge: 5, // Optional
  origins: ['http://134.209.115.250', 'http://134.209.115.250:3000','http://localhost','http://localhost:3000','*'],
  allowHeaders: ['Origin, X-Requested-With, Content-Type, Accept, Authorization, OPTIONS, Access-Control-Allow-Headers', 'Access-Control-Allow-Origin'],
  exposeHeaders: []
});
function AppServer() {
  this.server = restify.createServer({
    name: `${project.name}-server`,
    version: project.version
  });

this.server.use(function (req, res, next) {
    // This will set the idle timer to 10 minutes
    req.connection.setTimeout(600 * 1000);
    res.connection.setTimeout(600 * 1000); //**Edited**
    next();
});

  this.server.serverKey = '';
  this.server.pre(cors.preflight);
  this.server.use(cors.actual);
  
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());
  this.server.use(restify.plugins.fullResponse());
  this.server.use(morgan('dev'));

  

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res) => {
    wrapper.response(res, 'success', wrapper.data('Index'), 'This service is running properly');
  });

  //#region User
  
  this.server.post('/api/auth/register', users.register);
  this.server.post('/api/auth/login',users.login);

  //#endregion

  //#region article

  this.server.get('/api/article-category', article_category.get);
  this.server.get('/api/article-category/:id', article_category.getById);
  this.server.post('/api/article-category/create',jwtAuth.verifyToken, article_category.insert);


  this.server.post('/api/article/create',jwtAuth.verifyToken, article.insert);
  this.server.get('/api/article', article.get);
  this.server.get('/api/article/:id', article.findById);

  //#endregion
restifySwaggerJsdoc.createSwaggerPage({
  title: 'API documentation', // Page title
  version: '1.0.0', // Server version
  server: this.server, // Restify server instance created with restify.createServer()
  path: '/docs/swagger', // Public url where the swagger page will be available,
});

}
module.exports = AppServer;
