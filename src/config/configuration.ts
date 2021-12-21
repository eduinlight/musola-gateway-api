import path from 'path';

const config = () => {
  const { FRONT_URL, PORT, BASE_URL, MONGO_URI } = process.env;

  return {
    frontUrl: FRONT_URL,
    port: PORT,
    baseUrl: BASE_URL,

    logsPath: path.join(__dirname, '../../access.log'),

    mongodb: {
      uri: MONGO_URI,
    },
  };
};

export default config;
