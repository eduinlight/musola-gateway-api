import { Injectable } from '@nestjs/common';
import { RepositoryMock } from '../core/repository.mock';
import { IGateway } from '../models/gateway.model';
import { IPeripheral } from '../models/peripheral.model';

@Injectable()
export class PeripheralRepositoryMock extends RepositoryMock<IPeripheral> {
  constructor() {
    super();
  }

  getByGateway(id: IGateway['id']) {
    return this.data.filter((peripheral) => peripheral.gateway === id);
  }
}
