import { Stack, styled, Tab, Tabs, TabsProps } from '@mui/material';
import { ChartData } from 'chart.js';
import { SyntheticEvent, useState } from 'react';
import { StackedBarChart } from './StackedBarChart';

const mockData1: ChartData<'bar', (number | undefined)[], string> = {
  labels: [
    'Comisia economie, buget și finanțe',
    'Comisia juridică, numiri şi imunităţi',
    'Comisia protecție socială, sănătate și familie',
    'Comisia agricultură și industrie alimentară',
    'Comisia cultură, educație, cercetare, tineret, sport și mass-media',
  ],
  datasets: [
    {
      backgroundColor: '#FDE68A',
      data: [undefined, 0, 20, 0, 1],
      datalabels: {
        display: false,
      },
      label: 'Hotărâri retrase/respinse',
    },
    {
      backgroundColor: '#FBBF24',
      data: [20, 10, 2, 3],
      datalabels: {
        display: false,
      },
      label: 'Hotărâri în examinare',
    },
    {
      backgroundColor: '#D97706',
      data: [0, 0, 20, 10],
      datalabels: {
        display: false,
      },
      label: 'Hotărâri adoptate și comasate',
    },
    {
      backgroundColor: '#BAE6FD',
      data: [0, 0, 20, 3],
      datalabels: {
        display: false,
      },
      label: 'Legi retrase/respinse',
    },
    {
      backgroundColor: '#38BDF8',
      data: [20, 10, 0, 3],
      datalabels: {
        display: false,
      },
      label: 'Legi în examinare',
    },
    {
      backgroundColor: '#0284C7',
      data: [10, 20, 30, 40],
      datalabels: {
        display: false,
      },
      label: 'Legi adoptate și comasate',
    },
  ],
};

const mockData2: ChartData<'bar', (number | undefined)[], string> = {
  labels: [
    'Comisia economie, buget și finanțe',
    'Comisia juridică, numiri şi imunităţi',
    'Comisia protecție socială, sănătate și familie',
    'Comisia agricultură și industrie alimentară',
    'Comisia cultură, educație, cercetare, tineret, sport și mass-media',
  ],
  datasets: [
    {
      backgroundColor: '#BAE6FD',
      data: [undefined, 0, 20, 0, 1],
      datalabels: {
        display: false,
      },
      label: 'Numărul de proiecte în care comisia este/a fost raportor',
    },
    {
      backgroundColor: '#0284C7',
      data: [20, 10, 2, 3],
      datalabels: {
        display: false,
      },
      label: 'Numărul de proiecte în care comisia este/a fost coraportor',
    },
  ],
};

const mockData3: ChartData<'bar', (number | undefined)[], string> = {
  labels: [
    'Comisia economie, buget și finanțe',
    'Comisia juridică, numiri şi imunităţi',
    'Comisia protecție socială, sănătate și familie',
    'Comisia agricultură și industrie alimentară',
    'Comisia cultură, educație, cercetare, tineret, sport și mass-media',
  ],
  datasets: [
    {
      backgroundColor: '#BAE6FD',
      data: [25, 4, 20, 62, 1],
      datalabels: {
        // display: false,
        align: 'end',
        anchor: 'end',
        font: {
          size: 20,
          weight: 600,
        },
      },
      label: 'Avize acordate',
    },
  ],
};

type StyledTabProps = {
  label: string;
};

const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  borderRadius: 8,
  color: theme.palette.grey[900],
  fontWeight: theme.typography.fontWeightMedium,
  padding: theme.spacing(2, 3),
  textTransform: 'none',

  '&.Mui-selected': {
    color: theme.palette.grey[900],
    backgroundColor: theme.palette.grey[100],
  },
}));

const StyledTabs = styled((props: TabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
  },
});

export function CommitteesActivityCharts() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Stack gap={4} mt={10}>
      <StyledTabs
        onChange={handleTabChange}
        scrollButtons='auto'
        value={tabValue}
        // variant='fullWidth'
      >
        <StyledTab label='Proiecte în care Comisia a fost numită raportor principal' />
        <StyledTab label='Proiecte în care Comisia a fost numită raportor principal' />
        <StyledTab label='Proiecte în care Comisia a fost numită raportor principal' />
      </StyledTabs>

      {/* @todo chart data is missing. Ask from API */}
      {tabValue === 0 && <StackedBarChart data={mockData1} showLegend />}
      {tabValue === 1 && <StackedBarChart data={mockData2} showLegend />}
      {tabValue === 2 && <StackedBarChart data={mockData3} />}
    </Stack>
  );
}
