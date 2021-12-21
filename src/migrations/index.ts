import { mongoMigrateCli } from 'mongo-migrate-ts';
import path from 'path';
import { config } from 'dotenv';
config();

const { MONGO_URI } = process.env;

mongoMigrateCli({
  uri: MONGO_URI,
  migrationsDir: path.join(__dirname, './run'),
  migrationsCollection: 'migrations',
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
});
