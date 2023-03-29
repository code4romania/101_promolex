import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { chain } from 'lodash';
import { useState } from 'react';
import {
  useIncomeStatementsByDeputyQuery,
  useStatementYearQuery,
} from '../queries';
import { statementsTableColumns } from '../utils';
import { DeputyIncomeCard } from './DeputyIncomeCard';
import { Table } from './Table';

const deputyWealthIconsMap: {
  category: string;
  color: string;
  label?: string;
}[] = [
  { category: 'venit', color: '#EE7C83' },
  {
    category: 'bunuriImobile',
    color: '#F8A58D',
  },
  {
    category: 'bunuriMobile',
    color: '#EE7C83',
  },
  {
    category: 'activeFinanciare',
    color: '#88A9B5',
  },
  { category: 'afaceri', color: '#474757' },
  { category: 'bunuriDeValoare', color: '#E9C699', label: 'Bunuri de Valoare' },

  { category: 'datorii', color: '#88A9B5' },
  {
    category: 'interesePersonale',
    color: '#E9C699',
  },
];

type DeputyWealthProps = {
  did: string;
};

export function DeputyWealth({ did }: DeputyWealthProps) {
  const { data: year } = useStatementYearQuery();
  const [selectedYear, setSelectedYear] = useState(year ?? '2021');
  const { data: incomeStatements } = useIncomeStatementsByDeputyQuery(
    did,
    selectedYear,
  );

  const [selectedCategory, setSelectedCategory] = useState(
    deputyWealthIconsMap[0].category,
  );

  return (
    <Stack gap={6}>
      <Stack alignItems='center' direction='row' justifyContent='space-between'>
        <Typography fontWeight={700} variant='h5'>
          Declarația de avere și interese personale
        </Typography>

        <Stack alignItems='center' direction='row' gap={2}>
          <Typography>Selectează anul</Typography>
          <Select
            labelId='year'
            onChange={(event) => setSelectedYear(event.target.value)}
            value={selectedYear}
          >
            <MenuItem value='2021'>2021</MenuItem>
            <MenuItem value='2022'>2022</MenuItem>
          </Select>
        </Stack>
      </Stack>

      <Stack
        direction='row'
        gap={2}
        overflow='auto'
        justifyContent='space-between'
      >
        {deputyWealthIconsMap.map(({ category, color, label }) => (
          <DeputyIncomeCard
            key={category}
            bgcolor={color}
            icon={
              incomeStatements?.[category]?.icon
                .replace('fa-solid', 'fas')
                .replace('fa-', '')
                .split(' ') as IconProp
            }
            isActive={selectedCategory === category}
            label={label ?? chain(category).startCase().value()}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </Stack>
      <Table
        columns={statementsTableColumns}
        getRowId={(row) => row.itemid}
        height={350}
        hideFooter={!incomeStatements?.[selectedCategory]?.items?.length}
        rows={incomeStatements?.[selectedCategory]?.items ?? []}
      />
    </Stack>
  );
}
