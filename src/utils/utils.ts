import { parse } from 'querystring';

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const getDayStr = (daysFromToday: number, connector = '-') => {
  const discrepancyTimestamp = 24 * 3600 * 1000 * daysFromToday;
  const today = new Date();
  today.setTime(
    parseInt((today.getTime() + discrepancyTimestamp).toString(), 10),
  );
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const monthStr = `${month <= 9 ? '0' : ''}${month}`;
  const dayStr = `${!(today.getDate() >= 9) ? '0' : ''}${today.getDate()}`;
  return `${year}${connector}${monthStr}${connector}${dayStr}`;
};

export const getLastMonthStr = (connector = '-') => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const monthStr = `${!(month >= 9) ? '0' : ''}${month}`;
  if (month === 0) {
    return `${year - 1}${connector}${12}`;
  }
  return `${year}${connector}${monthStr}`;
};

export const isShallowEqualForObject = (obj1: any, obj2: any): boolean => {
  // 注意：这个仅仅比较了对象中的 **自身可枚举属性**
  const obj1Type = typeof obj1;
  const obj2Type = typeof obj2;
  if (obj1Type !== 'object' || obj2Type !== 'object') {
    throw Error('传入的参数类型必须是对象！');
  }
  if (obj1 === null || obj2 === null) {
    return obj1 === obj2;
  }
  if (Object.keys(obj1).length === Object.keys(obj2).length) {
    return Object.keys(obj1).every((key: string) => {
      const value1 = obj1[key];
      const value2 = obj2[key];
      const value1Type = typeof value1;
      const value2Type = typeof value2;
      if (value1Type === value2Type) {
        switch (value1Type) {
          case 'function':
          case 'symbol':
          case 'bigint':
            return true;
          case 'undefined':
          case 'boolean':
          case 'number':
          case 'string':
            return value1 === value2;
          case 'object':
            // object + null
            if (value1 === null && value2 === null) {
              return true;
            }
            return isShallowEqualForObject(value1, value2);
          default:
            return false;
        }
      }
      return false;
    });
  }
  return false;
};

export const errorHandle = (error: Error) => {
  console.error(error);
  window.location.replace(`${window.location.origin}/not_found`);
};

export const isMobile = (mobile: string) => /^1[3456789]\d{9}$/g.test(mobile);

export const isEmail = (value: string) => {
  const email = value ? value.trim() : value;
  return /^([a-zA-Z0-9])([a-zA-Z0-9_\.\-]){2,}([a-zA-Z0-9])\@(([a-zA-Z0-9\-])+\.)+(com|edu|gov|int|mil|net|org|biz|info|pro|name|museum|coop|aero|xxx|idv|cn)$/.test(
    email,
  );
};
