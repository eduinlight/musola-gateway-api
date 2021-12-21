import { NotFoundException } from '@nestjs/common';

export class PeripheralDontExist extends NotFoundException {
  constructor() {
    super('peripheral does not exist');
  }
}
