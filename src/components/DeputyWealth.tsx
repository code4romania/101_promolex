import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Stack, SvgIconProps, Typography } from '@mui/material';
import { chain, keys, values } from 'lodash';
import { useMemo, useState } from 'react';
import {
  useIncomeStatementsByDeputyQuery,
  useStatementYearQuery,
} from '../queries';
import { statementsTableColumns } from '../utils';
import { DeputyIncomeCard } from './DeputyIncomeCard';
import {
  BusinessesIcon,
  DebtsIcon,
  FinancialActivesIcon,
  ImmovableAssetsIcon,
  IncomeIcon,
  MovableAssetsIcon,
  PersonalInterestsIcon,
  ValuablesIcon,
} from './Icons';
import { Table } from './Table';

const deputyWealthIconsMap: {
  [k: string]: { icon: (props: SvgIconProps) => JSX.Element; color: string };
} = {
  activeFinanciare: { icon: FinancialActivesIcon, color: '#88A9B5' },
  afaceri: { icon: BusinessesIcon, color: '#4747574D' },
  bunuriDeValoare: { icon: ValuablesIcon, color: '#E9C699' },
  bunuriImobile: { icon: ImmovableAssetsIcon, color: '#F6C3B466' },
  bunuriMobile: { icon: MovableAssetsIcon, color: '#EE7C8366' },
  datorii: { icon: DebtsIcon, color: '#88A9B566' },
  interesePersonale: { icon: PersonalInterestsIcon, color: '#E9C69966' },
  venit: { icon: IncomeIcon, color: '#EE7C8366' },
};

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
            bgcolor={
              deputyWealthIconsMap[
                category as keyof typeof deputyWealthIconsMap
              ].color
            }
            icon={
              statements[index]?.icon
                .replace('fa-solid', 'fas')
                .replace('fa-', '')
                .split(' ') as IconProp
            }
            isActive={selectedCategory === index}
            label={chain(category).startCase().toLower().upperFirst().value()}
            onClick={() => setSelectedCategory(index)}
          />
        ))}
      </Stack>
      <Table
        columns={statementsTableColumns}
        getRowId={(row) => row.itemid}
        height={350}
        hideFooter={!statements[selectedCategory]?.items?.length}
        rows={statements[selectedCategory]?.items ?? []}
      />
    </Stack>
  );
}
