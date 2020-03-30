const Jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

const UsersModel = require('../models/usersModel');
const ToolsModel = require('../models/toolsModel');

const transformerTools = require('../helpers/transformers/transformerTools');
const PasswordHelper = require('../helpers/pwdHelper');

const login = async (request, h) => {
  try {
    let { username, password } = request.payload;

    const passwordHash = await PasswordHelper.hashPassword(password);
    password = passwordHash;

    const result = await new UsersModel({
      username,
      password,
    });

    result.save();

    return h.response(result).code(201);
  } catch (error) {
    console.log('err', error);
    return Boom.internal();
  }
};

const token = async request => {
  const { username, password } = request.payload;

  const [user] = await UsersModel.find({
    username,
  });

  if (!user) {
    return Boom.unauthorized('O Usuário ou Senha inválidos!');
  }

  const match = await PasswordHelper.comparePassword(password, user.password);

  if (!match) {
    return Boom.unauthorized('O Usuário ou Senha inválidos!');
  }

  const token = Jwt.sign(
    {
      username: username,
      id: user._id,
    },
    process.env.JWT_KEY
  );
  return {
    token,
  };
};

const getAll = async request => {
  try {
    const { skip, limit, tag } = request.query;

    const tags = tag ? { tags: tag } : {};

    const tools = await ToolsModel.find(tags)
      .skip(skip)
      .limit(limit);
    //return tools;
    return { data: tools.map(transformerTools) };
  } catch (error) {
    return Boom.internal();
  }
};

const create = async (request, h) => {
  try {
    const { title, link, description, tags } = request.payload;

    const result = await new ToolsModel({
      title,
      link,
      description,
      tags,
    });

    result.save();

    return h.response(transformerTools(result)).code(201);
  } catch (error) {
    return Boom.internal();
  }
};

const update = async req => {
  const { id } = req.params;
  const { payload } = req;

  await ToolsModel.updateOne(
    {
      _id: id,
    },
    {
      $set: payload,
    }
  );

  return { message: 'Tools atualizado com sucesso!' };
};

const remove = async (req, h) => {
  await ToolsModel.findOneAndDelete({
    _id: req.params.id,
  });

  return h.response({}).code(204);
};

module.exports = { getAll, create, update, remove, login, token };
