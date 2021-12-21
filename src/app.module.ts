import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config, envConfigSchema } from './config';
import { ApiModule } from './modules/api/api.module';
import { AppService } from './app.service';
import { DataManagerModule } from './modules/data_manager/data_manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      load: [config],
      validationSchema: envConfigSchema,
    }),
    DataManagerModule,
    ApiModule,
  ],
  providers: [AppService, Logger],
})
export class AppModule {}
