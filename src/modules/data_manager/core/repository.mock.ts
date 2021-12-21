import IModel from './imodel';

export class RepositoryMock<T extends IModel> {
  data: T[];
  index: number;

  constructor() {
    this.data = [];
    this.index = 0;
  }

  get(id: T['id']) {
    return Promise.resolve(this.data.find((data) => data.id === id));
  }

  filter({ skip, limit }: { limit: number; skip: number }) {
    return Promise.resolve(this.data.slice(skip, skip + limit));
  }

  create(data: T) {
    const newGateway = {
      ...data,
      id: (this.index++).toString(),
    };
    this.data.push(newGateway);
    return Promise.resolve(newGateway);
  }

  updateById(id: T['id'], data: Partial<T>) {
    let updated: T | null = null;
    this.data = this.data.map((d) => {
      if (d.id === id) {
        updated = {
          ...d,
          ...data,
        };
        return updated;
      }
      return d;
    });
    return Promise.resolve(updated);
  }

  deleteById(id: T['id']) {
    let response = undefined;
    this.data = this.data.filter((data) => {
      if (data.id === id) {
        response = data.id;
        return false;
      }
      return true;
    });
    return Promise.resolve(response);
  }

  deleteAllById(ids: T['id'][]) {
    let response = 0;
    this.data = this.data.filter((data) => {
      if (ids.includes(data.id)) {
        response++;
        return false;
      }
      return true;
    });
    return Promise.resolve(response);
  }
}
