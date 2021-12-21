import {
  IsDateString,
  IsEnum,
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { EPeripheralStatus } from '../../../data_manager/models/peripheral.model';

export class AddPeripheralDto {
  @IsNumber()
  uid: number;

  @IsString()
  vendor: string;

  @IsDateString()
  dateCreated: Date;

  @IsEnum(EPeripheralStatus)
  status: EPeripheralStatus;
}

export class EditPeripheralDto {
  @IsOptional()
  @IsNumber()
  uid: number;

  @IsOptional()
  @IsString()
  vendor: string;

  @IsOptional()
  @IsDateString()
  dateCreated: Date;

  @IsOptional()
  @IsEnum(EPeripheralStatus)
  status: EPeripheralStatus;
}
