/* eslint-disable @typescript-eslint/no-explicit-any */
import { camelCase } from 'lodash';

export const mapKeysToCamelCase = (obj: any): any => {
  if (obj instanceof Array) {
    return obj.map((val) => mapKeysToCamelCase(val));
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce<{ [key: string]: any }>((acc, key) => {
      const camelCaseKey = camelCase(key);
      acc[camelCaseKey] = mapKeysToCamelCase(obj[key]);
      return acc;
    }, {});
  }

  return obj;
};
