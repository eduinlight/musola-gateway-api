import { IsIP, IsOptional, IsString } from 'class-validator';

export class AddGatewayDto {
  @IsString()
  serial: string;

  @IsString()
  name: string;

  @IsIP(4)
  @IsString()
  ipv4: string;
}

export class EditGatewayDto {
  @IsOptional()
  @IsString()
  serial: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsIP(4)
  @IsString()
  ipv4: string;
}
