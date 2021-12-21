import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Repository from '../core/repository';
import { IPeripheral, PeripheralDocument } from '../models/peripheral.model';

@Injectable()
export class PeripheralRepository extends Repository<
  PeripheralDocument,
  IPeripheral
> {
  constructor(
    @InjectModel('Peripheral')
    protected readonly model: Model<PeripheralDocument>,
  ) {
    super(model);
  }

  async getByUid(uid: IPeripheral['uid']) {
    return await this.filterOne({ uid });
  }
}
