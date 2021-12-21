import { Module } from '@nestjs/common';
import { DataManagerModule } from '../data_manager/data_manager.module';
import { GatewaysService } from './services/gateways.service';

@Module({
  imports: [DataManagerModule],
  providers: [GatewaysService],
  exports: [GatewaysService],
})
export class GatewaysModule {}
