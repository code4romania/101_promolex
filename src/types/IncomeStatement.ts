export type IncomeStatement = {
  itemid: string;
  item_name: string;
  property_type: string;
  acquisition: string;
  cost: string;
  currency: string;
  market_cost: string;
  market_currency: string;
  note: string;
};

export type IncomeStatements = {
  [k: string]: IncomeStatement[];
};
