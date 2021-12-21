import { Injectable } from '@nestjs/common';
import { IGateway } from '../../data_manager/models/gateway.model';
import { IPeripheral } from '../../data_manager/models/peripheral.model';
import { GatewayRepository } from '../../data_manager/repositories/gateway.repository';
import { PeripheralRepository } from '../../data_manager/repositories/peripheral.repository';
import { GatewayDontExist } from '../exceptions/gateway_dont_exist';
import { GatewayExist } from '../exceptions/gateway_exist';
import { GatewayFull } from '../exceptions/gateway_full';
import { PeripheralDontExist } from '../exceptions/peripheral_dont_exist';

@Injectable()
export class GatewaysService {
  constructor(
    private readonly peripheralRepository: PeripheralRepository,
    private readonly gatewayRepository: GatewayRepository,
  ) {}

  async filter(skip: number, limit: number) {
    return await this.gatewayRepository.filter({ limit, skip });
  }

  async get(id: IGateway['id']) {
    const gateway = await this.gatewayRepository.get(id);
    if (!gateway) {
      throw new GatewayDontExist();
    }

    return gateway;
  }

  async create(data: IGateway) {
    const existGateway = await this.gatewayRepository.existSerial(data.serial);
    if (existGateway) {
      throw new GatewayExist();
    }
    return await this.gatewayRepository.create(data);
  }

  async update(id: IGateway['id'], data: Partial<IGateway>) {
    const gateway = await this.get(id);
    return await this.gatewayRepository.updateById(gateway.id, data);
  }

  async delete(id: IGateway['id']) {
    const gateway = await this.get(id);
    await this.peripheralRepository.deleteAllById(
      gateway.peripherals.map((peripheral) => peripheral.id),
    );
    return await this.gatewayRepository.deleteById(id);
  }

  async getPeripheral(id: IPeripheral['id']) {
    const peripheral = await this.peripheralRepository.get(id);
    if (!peripheral) {
      throw new PeripheralDontExist();
    }
    return peripheral;
  }

  async addPeripheral(
    gatewayId: IGateway['id'],
    data: Omit<IPeripheral, 'gateway'>,
  ) {
    const gateway = await this.get(gatewayId);
    if (gateway.peripherals.length >= 10) {
      throw new GatewayFull();
    }

    return await this.peripheralRepository.create({
      ...data,
      gateway: gateway.id,
    });
  }

  async updatePeripheral(id: IPeripheral['id'], data: Partial<IPeripheral>) {
    const peripheral = await this.getPeripheral(id);

    return await this.peripheralRepository.updateById(peripheral.id, data);
  }

  async deletePeripheral(id: IPeripheral['id']) {
    const peripheral = await this.getPeripheral(id);
    return await this.peripheralRepository.deleteById(peripheral.id);
  }
}
