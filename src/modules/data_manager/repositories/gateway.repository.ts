import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Repository from '../core/repository';
import { GatewayDocument, IGateway } from '../models/gateway.model';

@Injectable()
export class GatewayRepository extends Repository<GatewayDocument, IGateway> {
  constructor(
    @InjectModel('Gateway')
    protected readonly model: Model<GatewayDocument>,
  ) {
    super(model);
  }

  async deleteBySerial(serial: IGateway['serial']) {
    return await this.delete({ serial });
  }

  async getBySerial(serial: IGateway['serial']) {
    return await this.filterOne({ serial });
  }

  async existSerial(serial: IGateway['serial']) {
    return await this.exists({ serial });
  }
}
