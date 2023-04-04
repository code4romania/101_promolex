import cookie from 'js-cookie';

const LEGISLATURE_FROM = 'legislatureFrom';
export const setLegislatureFromDate = (date: string) => {
  cookie.set(LEGISLATURE_FROM, date, { expires: 1 });
};

export const getLegislatureFromDate = () => cookie.get(LEGISLATURE_FROM);
