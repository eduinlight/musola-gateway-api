import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import express from 'express';
import path from 'path';
import { loggerMorgen } from './logger';

export function configApp(app: INestApplication) {
  const config = app.get(ConfigService);
  const env = process.env.NODE_ENV;

  // LOGS
  app.use(loggerMorgen(env));

  // STATIC FILES
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // SECURITY HEADERS
  app.use(helmet());

  if (env === 'production') {
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
      }),
    );
  }

  // ENABLE CORS
  app.enableCors({
    origin: [config.get('frontUrl')],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      validationError: {
        target: true,
      },
    }),
  );

  return app;
}
