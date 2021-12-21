import { Schema, Document } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import IModel from '../core/imodel';
import { IPeripheral } from './peripheral.model';

export interface IGateway extends IModel {
  serial: string;
  name: string;
  ipv4: string;
  peripherals?: IPeripheral[];
}

export type GatewayDocument = IGateway & Document;

export const gatewaySchema: Schema = new Schema(
  {
    serial: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    ipv4: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_: any, ret: any): any => {
        const id = ret._id;
        delete ret.__v;
        delete ret._id;

        return {
          id,
          ...ret,
        };
      },
    },
  },
);

gatewaySchema.virtual('peripherals', {
  ref: 'Peripheral',
  localField: '_id',
  foreignField: 'gateway',
  options: {},
  autopopulate: true,
});

gatewaySchema.plugin(autopopulate);
