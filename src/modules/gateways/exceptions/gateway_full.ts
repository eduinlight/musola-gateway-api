import { BadRequestException } from '@nestjs/common';

export class GatewayFull extends BadRequestException {
  constructor() {
    super('gateway full');
  }
}
