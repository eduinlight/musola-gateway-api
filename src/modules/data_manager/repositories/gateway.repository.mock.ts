import { Injectable } from '@nestjs/common';
import { IGateway } from '../models/gateway.model';
import { RepositoryMock } from '../core/repository.mock';
import { PeripheralRepositoryMock } from './peripheral.repository.mock';

@Injectable()
export class GatewayRepositoryMock extends RepositoryMock<IGateway> {
  constructor(public peripheralsRepository: PeripheralRepositoryMock) {
    super();
  }

  async get(id: IGateway['id']) {
    const gateway = await super.get(id);
    if (gateway) {
      gateway.peripherals = this.peripheralsRepository.getByGateway(id);
    }
    return gateway;
  }

  existSerial(serial: IGateway['serial']) {
    return Promise.resolve(
      Boolean(this.data.find((gateway) => gateway.serial === serial)),
    );
  }
}
