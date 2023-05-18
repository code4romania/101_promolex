import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { chain, entries } from 'lodash';
import { useMemo, useState } from 'react';
import {
  useIncomeStatementYearsByDeputyIdQuery,
  useIncomeStatementsByDeputyQuery,
  useStatementYearQuery,
} from '../queries';
import { DeputyIncomeCard } from './DeputyIncomeCard';
import { Table } from './Table';

const deputyWealthIconsMap: {
  category: string;
  color: string;
  label?: string;
}[] = [
  { category: 'Venit', color: '#EE7C83' },
  {
    category: 'Bunuri imobile',
    color: '#F8A58D',
  },
  {
    category: 'Bunuri mobile',
    color: '#EE7C83',
  },
  {
    category: 'Active financiare',
    color: '#88A9B5',
  },
  { category: 'Afaceri', color: '#474757' },
  {
    category: 'Bunuri de valoare',
    color: '#E9C699',
    label: 'Bunuri de Valoare',
  },

  { category: 'Datorii', color: '#88A9B5' },
  {
    category: 'Interese personale',
    color: '#E9C699',
  },
];

const smallerColumns = [
  'item_name',
  'cost',
  'currency',
  'property_type',
  'surface',
  'acquisition',
];

type DeputyWealthProps = {
  did: string;
};

export function DeputyWealth({ did }: DeputyWealthProps) {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date(Date.now()).getFullYear().toString() ?? '',
  );
  const { isInitialLoading: isLoadingStatementYear } = useStatementYearQuery({
    onSuccess: (year) => setSelectedYear(year),
    refetchOnMount: true,
    staleTime: 0,
  });
  const {
    data: incomeStatements,
    isInitialLoading: isLoadingIncomeStatements,
  } = useIncomeStatementsByDeputyQuery(
    did,
    isLoadingStatementYear ? '' : selectedYear,
  );

  const { data: years, isInitialLoading: isLoadingStatementYears } =
    useIncomeStatementYearsByDeputyIdQuery(did);

  const [selectedCategory, setSelectedCategory] = useState(
    deputyWealthIconsMap[0].category,
  );

  const columns = useMemo(
    () =>
      incomeStatements?.categorys[selectedCategory].table_keys.flatMap(
        (tableKey) =>
          entries(tableKey).map(([headerName, field]) => ({
            field,
            headerName,
            flex: smallerColumns.includes(field) ? 0.5 : 1,
            minWidth: smallerColumns.includes(field) ? 120 : 200,
          })),
      ) ?? [],
    [incomeStatements?.categorys, selectedCategory],
  );

  const isLoading = isLoadingStatementYear || isLoadingIncomeStatements;

  return (
    <Stack gap={6}>
      <Grid container alignItems='center' rowSpacing={4}>
        <Grid item xs={12} md={4}>
          <Typography fontWeight={700} variant='h5'>
            Declarația de avere și interese personale
          </Typography>
        </Grid>

        <Grid item xs={12} md={8}>
          <Stack alignItems='center' direction='row' gap={2}>
            <Typography>Selectează anul</Typography>
            <Select
              disabled={isLoadingStatementYears}
              labelId='year'
              onChange={(event) => setSelectedYear(event.target.value)}
              value={selectedYear}
            >
              {years?.map(({ year }) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>

            <Button
              disabled={isLoading}
              LinkComponent={Link}
              href={incomeStatements?.statement_file ?? ''}
              sx={{ ml: 'auto' }}
              target='_blank'
              variant='outlined'
            >
              Descarcă declarația
            </Button>
          </Stack>
        </Grid>
      </Grid>

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
              incomeStatements?.categorys[category]?.icon
                .replace('fa-solid', 'fas')
                .replace('fa-', '')
                .split(' ') as IconProp
            }
            isActive={selectedCategory === category}
            isLoading={isLoading}
            label={label ?? chain(category).startCase().value()}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </Stack>
      <Table
        isLoading={isLoading}
        columns={columns}
        getRowId={(row) => row.itemid}
        getRowHeight={() => 'auto'}
        height='auto'
        hideFooter={
          !incomeStatements?.categorys[selectedCategory]?.items?.length
        }
        rows={incomeStatements?.categorys[selectedCategory]?.items ?? []}
      />
    </Stack>
  );
}
