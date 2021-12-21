import { BadRequestException } from '@nestjs/common';

export class GatewayExist extends BadRequestException {
  constructor() {
    super('serial already exist');
  }
}
