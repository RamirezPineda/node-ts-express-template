import { AttrTypeEnum, OrderEnum, type Query, type QueryOptions } from '@/common/interfaces';
import { ILike } from 'typeorm';

export const convertToQuery = (queryOptions: QueryOptions): Query => {
  const { offset, limit, attr, value, order, attrType } = queryOptions;

  const pagination = { skip: offset, take: limit };
  const orderBy = order ? { createdAt: order } : { createdAt: OrderEnum.desc };

  let where = {};
  if (attr && value && attrType) {
    switch (attrType) {
      case AttrTypeEnum.string:
        where = { [attr]: ILike(`%${value}%`) };
        break;
      case AttrTypeEnum.boolean:
        where = { [attr]: value.toLocaleLowerCase() === 'true' };
        break;
      case AttrTypeEnum.number:
        where = { [attr]: Number(value) };
        break;
      case AttrTypeEnum.date: {
        const startDate = new Date(value ?? Date.now());
        const endDate = new Date(value ? value + 'T23:59:59.999Z' : Date.now());

        const startDateUTC = new Date(startDate.getTime() + startDate.getTimezoneOffset() * 60000);
        const endDateUTC = new Date(endDate.getTime() + endDate.getTimezoneOffset() * 60000);

        where = { [attr]: { gte: startDateUTC, lte: endDateUTC } };
        break;
      }
      case AttrTypeEnum.enum:
        where = { [attr]: value };
        break;
      default:
        break;
    }
  }

  const query = { ...pagination, orderBy, where };
  return query;
};
