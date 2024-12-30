export enum OrderEnum {
  asc = 'asc',
  desc = 'desc',
}

export enum AttrTypeEnum {
  number = 'number',
  string = 'string',
  date = 'date',
  boolean = 'boolean',
  enum = 'enum',
}

export type Order = 'asc' | 'desc';
export type AttrType = 'number' | 'string' | 'date' | 'boolean' | 'enum';

export interface QueryOptions {
  offset?: number;
  limit?: number;
  order?: Order;
  value?: string;
  attr?: string;
  attrType?: AttrType;
}

export interface Query {
  skip?: number;
  take?: number;
  orderBy?: { createdAt: Order };
  where: { [x: string]: boolean } | { [x: string]: string };
}
