import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GatewaysService } from '../../../gateways/services/gateways.service';
import { AddGatewayDto, EditGatewayDto } from '../validations/gateway.dto';
import {
  AddPeripheralDto,
  EditPeripheralDto,
} from '../validations/peripheral.dto';

@Controller('/gateways')
export class GatewaysController {
  constructor(private readonly gatewaysService: GatewaysService) {}

  @Get('/')
  async filterGateways(
    @Query('limit', new DefaultValuePipe(20), new ParseIntPipe())
    limit: number,
    @Query('skip', new DefaultValuePipe(0), new ParseIntPipe())
    skip: number,
  ) {
    return await this.gatewaysService.filter(skip, limit);
  }

  @Get('/:id')
  async getGateway(@Param('id') id: string) {
    return await this.gatewaysService.get(id);
  }

  @Post('/')
  async createGateway(@Body() data: AddGatewayDto) {
    return await this.gatewaysService.create(data);
  }

  @Put('/:id')
  async updateGateway(@Param('id') id: string, @Body() data: EditGatewayDto) {
    return await this.gatewaysService.update(id, data);
  }

  @Delete('/:id')
  async deleteGateway(@Param('id') id: string) {
    return await this.gatewaysService.delete(id);
  }

  @Post('/peripherals/:gatewayId')
  async addPeripheral(
    @Param('gatewayId') gatewayId: string,
    @Body() data: AddPeripheralDto,
  ) {
    return await this.gatewaysService.addPeripheral(gatewayId, data);
  }

  @Put('/peripherals/:id')
  async updatePeripheral(
    @Param('id') id: string,
    @Body() data: EditPeripheralDto,
  ) {
    return await this.gatewaysService.updatePeripheral(id, data);
  }

  @Delete('/peripherals/:id')
  async deletePeripheral(@Param('id') id: string) {
    return await this.gatewaysService.deletePeripheral(id);
  }
}
