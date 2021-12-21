import { Module } from '@nestjs/common';
import { GatewaysModule } from '../gateways/gateway.module';
import { GatewaysController } from './controllers/gateways/gateways.controller';

@Module({
  imports: [GatewaysModule],
  controllers: [GatewaysController],
  providers: [],
})
export class ApiModule {}
