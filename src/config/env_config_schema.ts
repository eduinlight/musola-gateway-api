import Joi from 'joi';

const envConfigSchema = Joi.object({
  FRONT_URL: Joi.string().uri(),
  BASE_URL: Joi.string().required(),
  PORT: Joi.number().default(9000),
  MONGO_URI: Joi.string().required(),
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test', 'provision')
    .default('development'),
});

export default envConfigSchema;
