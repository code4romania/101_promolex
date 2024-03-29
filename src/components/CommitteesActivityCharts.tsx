/* eslint-disable camelcase */
import { Box, Stack, Typography } from '@mui/material';
import { ChartData } from 'chart.js';
import { chain, keys, toPairs, zip } from 'lodash';
import { SyntheticEvent, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  useCommitteesMainReporterCoreporterDataByLegislatureQuery,
  useCommitteesMainReporterDataByLegislatureQuery,
  useCommitteesNoticesByLegislatureQuery,
} from '../queries';
import { SecondaryTabs, SecondaryTab } from './SecondaryTabs';
import { StackedBarChart } from './StackedBarChart';

const reportChartConfig = [
  {
    backgroundColor: '#FDE68A',
    label: 'Hotărâri retrase/respinse',
  },
  {
    backgroundColor: '#FBBF24',
    label: 'Hotărâri în examinare',
  },
  {
    backgroundColor: '#D97706',
    label: 'Hotărâri adoptate și comasate',
  },
  {
    backgroundColor: '#BAE6FD',
    label: 'Legi retrase/respinse',
  },
  {
    backgroundColor: '#38BDF8',
    label: 'Legi în examinare',
  },
  {
    backgroundColor: '#0284C7',
    label: 'Legi adoptate și comasate',
  },
];

const coreportConfig = [
  {
    backgroundColor: '#BAE6FD',
    label: 'Numărul de proiecte în care comisia este/a fost raportor',
  },
  {
    backgroundColor: '#0284C7',
    label: 'Numărul de proiecte în care comisia este/a fost coraportor',
  },
];

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Stack direction='row' gap={4}>
      <Box bgcolor={color} borderRadius={1} height={20} width={50} />
      <Typography fontWeight='medium'>{label}</Typography>
    </Stack>
  );
}

export function CommitteesActivityCharts() {
  const [params, setParams] = useSearchParams();
  const tabValue = parseInt(params.get('secondaryTab') ?? '0', 10);

  const {
    data: committeesMainReporterData,
    isLoading: isLoadingCommitteesMainReporterData,
  } = useCommitteesMainReporterDataByLegislatureQuery({
    enabled: tabValue === 0,
  });

  const committeesMainReporterDataChart = useMemo(() => {
    const labels = keys(committeesMainReporterData);
    const values = chain(committeesMainReporterData)
      .values()
      .map(
        ({
          hotarari_adoptate_comasate,
          hotarari_in_examinare,
          hotarari_retras_respins,
          legi_adoptate_comasate,
          legi_in_examinare,
          legi_retras_respins,
        }) =>
          [
            hotarari_retras_respins,
            hotarari_in_examinare,
            hotarari_adoptate_comasate,
            legi_retras_respins,
            legi_in_examinare,
            legi_adoptate_comasate,
          ].map((n) => parseInt(n, 10)),
      )
      .value();

    return {
      labels,
      datasets: reportChartConfig.map((config, index) => ({
        ...config,
        data: zip(...values)[index],
      })),
    };
  }, [committeesMainReporterData]);

  const {
    data: committeesMainReporterCoreporterData,
    isLoading: isLoadingCommitteesMainReporterCoreporterData,
  } = useCommitteesMainReporterCoreporterDataByLegislatureQuery({
    enabled: tabValue === 1,
  });

  const committeesMainReporterCoreporterDataChart = useMemo(() => {
    const labels = keys(committeesMainReporterCoreporterData);
    const values = chain(committeesMainReporterCoreporterData)
      .values()
      .map(({ comisie_raportor, comisie_coraportor }) =>
        [comisie_raportor, comisie_coraportor].map((n) => parseInt(n, 10)),
      )
      .value();

    return {
      labels,
      datasets: coreportConfig.map((config, index) => ({
        ...config,
        data: zip(...values)[index],
      })),
    };
  }, [committeesMainReporterCoreporterData]);

  const { data: committeeNotices, isLoading: isLoadingCommitteeNotices } =
    useCommitteesNoticesByLegislatureQuery({
      enabled: tabValue === 2,
    });

  const committeeNoticesChart = useMemo<
    ChartData<'bar', (number | undefined)[], string>
  >(() => {
    const [labels, data] = zip(...toPairs(committeeNotices));

    return {
      labels: labels as string[],
      datasets: [
        {
          backgroundColor: '#BAE6FD',
          data: data?.map((n) => parseInt(n ?? '0', 10)),
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end',
            font: {
              size: 14,
            },
          },
          label: 'Avize acordate',
        },
      ],
    };
  }, [committeeNotices]);

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setParams({
      tab: params.get('tab') ?? '1',
      secondaryTab: newValue.toString(),
    });
  };

  return (
    <Stack gap={4} mt={10}>
      <SecondaryTabs
        onChange={handleTabChange}
        scrollButtons='auto'
        value={tabValue}
        variant='fullWidth'
      >
        <SecondaryTab label='Proiecte în care Comisia a fost numită raportor principal' />
        <SecondaryTab label='Proiecte în care Comisia a fost numită raportor sau coraportor' />
        <SecondaryTab label='Avize acordate de Comisii' />
      </SecondaryTabs>

      {tabValue === 0 && (
        <>
          <StackedBarChart
            data={committeesMainReporterDataChart}
            isLoading={isLoadingCommitteesMainReporterData}
            showTicks
          />
          <Stack direction='row' flexWrap='wrap' columnGap={14} mt={8}>
            <Stack gap={2}>
              {reportChartConfig
                .slice(3)
                .reverse()
                .map((config) => (
                  <LegendItem
                    key={config.label}
                    color={config.backgroundColor}
                    label={config.label}
                  />
                ))}
            </Stack>
            <Stack gap={2}>
              {reportChartConfig
                .slice(0, 3)
                .reverse()
                .map((config) => (
                  <LegendItem
                    key={config.label}
                    color={config.backgroundColor}
                    label={config.label}
                  />
                ))}
            </Stack>
          </Stack>
        </>
      )}
      {tabValue === 1 && (
        <>
          <StackedBarChart
            data={committeesMainReporterCoreporterDataChart}
            isLoading={isLoadingCommitteesMainReporterCoreporterData}
            showTicks
          />
          <Stack gap={2} mt={8}>
            {coreportConfig.map((config) => (
              <LegendItem
                key={config.label}
                color={config.backgroundColor}
                label={config.label}
              />
            ))}
          </Stack>
        </>
      )}
      {tabValue === 2 && (
        <StackedBarChart
          data={committeeNoticesChart}
          isLoading={isLoadingCommitteeNotices}
          showTicks
        />
      )}
    </Stack>
  );
}
