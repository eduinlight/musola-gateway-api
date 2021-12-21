import { Document, FilterQuery, Model } from 'mongoose';
import IModel from './imodel';

export default abstract class Repository<
  TDataDocument extends Document & TData,
  TData extends IModel,
> {
  protected model: Model<TDataDocument>;

  public getModel = () => {
    return this.model;
  };

  constructor(model: Model<TDataDocument>) {
    this.model = model;
  }

  public existsById = async (_id: TData['id']): Promise<boolean> => {
    return await this.model.exists({ _id });
  };

  public exists = async (
    condition: FilterQuery<TDataDocument>,
  ): Promise<boolean> => {
    return await this.model.exists(condition);
  };

  public count = async (
    condition: FilterQuery<TDataDocument>,
  ): Promise<number> => {
    return await this.model.countDocuments(condition);
  };

  public getAll = async (): Promise<TData[]> => {
    return await this.model.find({});
  };

  public getByIds = async (
    ids = [''],
    skip = 0,
    limit = Number.MAX_SAFE_INTEGER,
    sort = '',
    select = '',
  ): Promise<TData[]> => {
    return await this.model
      .find({
        _id: { $in: ids } as any,
      })
      .skip(skip)
      .limit(limit)
      .select(select)
      .sort(sort);
  };

  public filterOne = async (
    condition: FilterQuery<TDataDocument>,
  ): Promise<TData | null> => {
    const result = await this.model.findOne(condition);
    return result || null;
  };

  public filter = async ({
    condition = {},
    skip = 0,
    limit = Number.MAX_SAFE_INTEGER,
    sort = '',
    select = '',
  }: {
    condition?: FilterQuery<TDataDocument>;
    skip?: number;
    limit?: number;
    sort?: string;
    select?: string | any;
  }): Promise<TData[]> => {
    return await this.model
      .find(condition)
      .skip(skip)
      .limit(limit)
      .select(select)
      .sort(sort);
  };

  public get = async (id: TData['id']): Promise<TData | null> => {
    return await this.model.findById(id);
  };

  public create = async (data: TData): Promise<TData> => {
    return await this.model.create(data);
  };

  public updateById = async (
    id: string,
    data: Partial<TData>,
  ): Promise<TData> => {
    return await this.update({ _id: id } as any, data);
  };

  public update = async (
    condition: FilterQuery<TDataDocument>,
    data: Partial<TData>,
  ): Promise<TData> => {
    return await this.model.findOneAndUpdate(condition, { $set: data } as any, {
      new: true,
    });
  };

  public updateAll = async (
    condition: FilterQuery<TDataDocument>,
    data: Partial<TData>,
  ): Promise<{ ok: number; n: number; nModified: number }> => {
    return await this.model.updateMany(condition, {
      $set: data,
    } as any);
  };

  public deleteById = async (id: TData['id']): Promise<boolean> => {
    const result = await this.deleteAllById([id]);
    return result > 0 ? id : undefined;
  };

  public deleteAllById = async (ids: TData['id'][]): Promise<number> => {
    const deleteResult = await this.model.deleteMany({
      _id: { $in: ids } as any,
    });

    return deleteResult.deletedCount;
  };

  public delete = async (
    condition: FilterQuery<TDataDocument>,
  ): Promise<boolean> => {
    const deleteResult = await this.model.deleteOne(condition);

    return deleteResult.deletedCount > 0;
  };

  public deleteAll = async (
    condition: FilterQuery<TDataDocument>,
  ): Promise<number> => {
    const deleteResult = await this.model.deleteMany(condition);

    return deleteResult.deletedCount;
  };

  public deleteAndReturn = async (
    condition: FilterQuery<TDataDocument>,
  ): Promise<TData | null> => {
    const data = await this.model.findOneAndDelete(condition);

    return data;
  };
}
