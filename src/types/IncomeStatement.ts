export type IncomeStatement = {
  acquisition: string;
  cost: string;
  currency: string;
  function: string;
  icname: string;
  itemid: string;
  item_name: string;
  market_cost: string;
  market_currency: string;
  note: string;
  organization: string;
  property_type: string;
  surface: string;
};

export type IncomeStatements = {
  statement_file: string;
  categorys: [
    {
      category: 'string';
      color: 'string';
      icon: string;
      items: IncomeStatement[];
      table_keys: [{ [k: string]: string }];
    },
  ];
};
