import { NotFoundException } from '@nestjs/common';

export class GatewayDontExist extends NotFoundException {
  constructor() {
    super('gateway does not exist');
  }
}
