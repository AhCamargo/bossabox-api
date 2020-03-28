const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || 'dev';

ok(env === 'prod' || env === 'dev', 'env is invalid, or dev or prod');

const configPath = join(__dirname, './config', `.env.${env}`);
config({
  path: configPath,
});

require('./services/mongodb');

const Hapi = require('@hapi/hapi');
const Vision = require('@hapi/vision');
const Inert = require('@hapi/inert');
const HapiSwagger = require('hapi-swagger');
const HapiJwt = require('hapi-auth-jwt2');

const JwtSecret = process.env.JWT_KEY;

const Routes = require('./routes/routes');
const UsersModel = require('../src/models/usersModel');

const app = Hapi.server({
  port: process.env.PORT || 7000,
  //host: 'localhost',
});

async function main() {
  app.route(Routes);

  const SwaggerOptions = {
    info: {
      title: 'API VUTTR - #TesteBossaBox',
      version: 'v1.0',
    },
    lang: 'pt',
  };

  await app.register([
    Vision,
    Inert,
    HapiJwt,
    {
      plugin: HapiSwagger,
      options: SwaggerOptions,
    },
  ]);

  await app.auth.strategy('jwt', 'jwt', {
    key: JwtSecret,
    validate: async item => {
      const username = item.username;

      const [user] = await UsersModel.find({
        username,
      });

      if (!user) {
        return {
          isValid: false,
        };
      }
      return {
        isValid: true,
      };
    },
  });

  await app.auth.default('jwt');

  await app.start();
  console.log('Server running on %s', app.info.uri);
}

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

main();
