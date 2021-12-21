import { Schema, Document } from 'mongoose';
import IModel from '../core/imodel';
import { IGateway } from './gateway.model';

export enum EPeripheralStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
}

export interface IPeripheral extends IModel {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: EPeripheralStatus;
  gateway: IGateway['id'];
}

export type PeripheralDocument = IPeripheral & Document;

export const peripheralSchema: Schema = new Schema(
  {
    uid: { type: Number, required: true },
    vendor: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    status: {
      type: String,
      enum: Object.values(EPeripheralStatus),
      required: true,
    },
    gateway: { type: Schema.Types.ObjectId, ref: 'Gateway' },
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
