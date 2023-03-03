export type IncomeStatement = {
  itemid: string;
  itemName: string;
  propertyType: string;
  acquisition: string;
  cost: string;
  currency: string;
  marketCost: string;
  marketCurrency: string;
  note: string;
};

export type IncomeStatements = {
  [k: string]: {
    icon: string;
    items: IncomeStatement[];
  };
};
