const Joi = require('@hapi/joi');

const toolsHandler = require('../handlers/toolsHandler');

const headers = Joi.object({
  authorization: Joi.string().required(),
}).unknown();

const failAction = (request, headers, erro) => {
  throw erro;
};

module.exports = [
  {
    method: 'GET',
    path: '/api/v1/tools',
    handler: toolsHandler.getAll,
    config: {
      tags: ['api'],
      description: 'Deve listar tools',
      notes: 'Pode paginar resultados e filtrar por tag',
      validate: {
        failAction,
        headers,
        query: {
          skip: Joi.number()
            .integer()
            .default(0),
          limit: Joi.number()
            .integer()
            .default(10),
          tag: Joi.string(),
        },
      },
    },
  },
  {
    path: '/api/v1/tools',
    method: 'POST',
    handler: toolsHandler.create,
    config: {
      tags: ['api'],
      description: 'Deve cadastrar tools',
      notes: 'Deve cadastrar tools por title,link,description e tags',
      validate: {
        failAction,
        headers,
        payload: {
          title: Joi.string()
            .required()
            .min(3)
            .max(100),
          link: Joi.string()
            .required()
            .min(3)
            .max(100),
          description: Joi.string()
            .required()
            .min(3)
            .max(500),
          tags: Joi.array()
            .required()
            .min(1)
            .max(100),
        },
      },
    },
  },
  {
    method: 'PATCH',
    path: '/api/v1/tools/{id}',
    handler: toolsHandler.update,
    config: {
      tags: ['api'],
      description: 'Deve atualizar tools',
      notes: 'Pode atualizar um ou mais campos',
      validate: {
        failAction,
        headers,
        params: {
          id: Joi.string().required(),
        },
        payload: {
          title: Joi.string()
            .min(3)
            .max(100),
          link: Joi.string()
            .min(3)
            .max(100),
          description: Joi.string()
            .min(3)
            .max(500),
          tags: Joi.array()
            .min(1)
            .max(100),
        },
      },
    },
  },
  {
    path: '/api/v1/tools/{id}',
    method: 'DELETE',
    handler: toolsHandler.remove,
    config: {
      tags: ['api'],
      description: 'Deve remover tools',
      notes: 'Deve remover tools por id',
      validate: {
        failAction,
        headers,
        params: {
          id: Joi.string().required(),
        },
      },
    },
  },
  {
    path: '/api/v1/login',
    method: 'POST',
    handler: toolsHandler.login,
    config: {
      //auth: false,
      tags: ['api'],
      description: 'Deve cadastrar usuários',
      notes: 'Deve cadastrar usuários com username,password',
      validate: {
        failAction,
        headers,
        payload: {
          username: Joi.string()
            .required()
            .min(3)
            .max(100),
          password: Joi.string()
            .required()
            .min(6)
            .max(100),
        },
      },
    },
  },
  {
    path: '/api/v1/token',
    method: 'POST',
    handler: toolsHandler.token,
    config: {
      auth: false,
      tags: ['api'],
      description: 'Obter token',
      notes: 'Faça login com user e password',
      validate: {
        failAction,
        payload: {
          username: Joi.string().required(),
          password: Joi.string().required(),
        },
      },
    },
  },
];
