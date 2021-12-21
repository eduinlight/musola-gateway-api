import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { gatewaySchema } from './models/gateway.model';
import { peripheralSchema } from './models/peripheral.model';
import { GatewayRepository } from './repositories/gateway.repository';
import { PeripheralRepository } from './repositories/peripheral.repository';

const providers = [PeripheralRepository, GatewayRepository];

const models = [
  { name: 'Peripheral', schema: peripheralSchema },
  { name: 'Gateway', schema: gatewaySchema },
];

export const mongodbConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get('mongodb.uri');
        return {
          uri,
          ...mongodbConfig,
        };
      },
    }),
    MongooseModule.forFeature(models),
  ],
  providers,
  exports: providers,
})
export class DataManagerModule {}
