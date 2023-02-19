import { Stack, Typography } from '@mui/material';
import { keys, values } from 'lodash';
import { useMemo, useState } from 'react';
import {
  useIncomeStatementsByDeputyQuery,
  useStatementYearQuery,
} from '../queries';
import { statementsTableColumns } from '../utils';
import { DeputyIncomeCard } from './DeputyIncomeCard';
import { Table } from './Table';

type DeputyWealthProps = {
  did: string;
};

export function DeputyWealth({ did }: DeputyWealthProps) {
  const { data: year } = useStatementYearQuery();
  const { data: incomeStatements } = useIncomeStatementsByDeputyQuery(
    did,
    year,
  );

  const [selectedCategory, setSelectedCategory] = useState(0);

  const [categories, statements] = useMemo(
    () => [keys(incomeStatements), values(incomeStatements)],
    [incomeStatements],
  );

  return (
    <Stack gap={6}>
      <Typography fontWeight={700} variant='h4'>
        Declarația de venituri
      </Typography>

      <Stack direction='row' gap={2} overflow='auto'>
        {categories.map((category, index) => (
          <DeputyIncomeCard
            key={category}
            bgcolor='#88A9B5'
            isActive={selectedCategory === index}
            label={category}
            onClick={() => setSelectedCategory(index)}
          />
        ))}
      </Stack>
      <Table
        columns={statementsTableColumns}
        getRowId={(row) => row.itemid}
        height={350}
        rows={statements[selectedCategory] ?? []}
      />
    </Stack>
  );
}
