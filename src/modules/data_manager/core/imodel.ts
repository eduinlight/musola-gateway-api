import { Document } from 'mongoose';

export default interface IModel {
  id?: Document['_id'];
  createdAt?: Date;
  updatedAt?: Date;
}
