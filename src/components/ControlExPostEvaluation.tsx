import { Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { first } from 'lodash';
import { SyntheticEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCommitteeExPostEvaluationYearsByLegislatureQuery } from '../queries';
import { ControlImpactExPostEvaluation } from './ControlImpactExPostEvaluation';
import { ControlLegalExPostEvaluation } from './ControlLegalExPostEvaluation';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';

export function ControlExportEvaluation() {
  const [params, setParams] = useSearchParams();
  const tabValue = parseInt(params.get('secondaryTab') ?? '0', 10);

  const [selectedLegalYear, setSelectedLegalYear] = useState<string>('');
  const [selectedImpactYear, setSelectedImpactYear] = useState<string>('');

  const {
    data: legalExPostEvaluationYears,
    isInitialLoading: isLoadingLegalExPostEvaluationYears,
  } = useCommitteeExPostEvaluationYearsByLegislatureQuery('Juridică', {
    enabled: tabValue === 0,
    refetchOnMount: false,
    onSuccess: (data) => {
      const firstYear = first(data);
      setSelectedLegalYear(firstYear?.evalYear ?? '');
    },
  });

  const {
    data: impactExPostEvaluationYears,
    isInitialLoading: isLoadingImpactExPostEvaluationYears,
  } = useCommitteeExPostEvaluationYearsByLegislatureQuery('De impact', {
    enabled: tabValue === 1,
    refetchOnMount: false,
    onSuccess: (data) => {
      const firstYear = first(data);
      setSelectedImpactYear(firstYear?.evalYear ?? '');
    },
  });

  const handleTabChange = (_: SyntheticEvent, newValue: number) => {
    setParams({
      tab: params.get('tab') ?? '1',
      secondaryTab: newValue.toString(),
    });
  };

  return (
    <Stack gap={6} mt={9}>
      <SecondaryTabs
        onChange={handleTabChange}
        scrollButtons='auto'
        value={tabValue}
      >
        <SecondaryTab label='Juridică' />
        <SecondaryTab label='De impact' />
      </SecondaryTabs>

      {tabValue === 0 && !isLoadingLegalExPostEvaluationYears && (
        <Stack gap={12}>
          <Box borderRadius={2} boxShadow={3} px={6} py={4}>
            <Typography gutterBottom variant='subtitle1'>
              Ce este evaluarea ex-post juridică?
            </Typography>
            <Typography textAlign='justify'>
              <strong>Evaluarea ex-post juridică</strong> reprezintă analiza
              aspectelor juridice privind actul normativ adoptat, pentru a
              verifica dacă au fost aprobate toate actele normative necesare
              pentru organizarea executării și implementarea actului normativ,
              dacă există anumite obstacole de ordin juridic în aplicarea
              actului normativ, dacă normele conținute în actul normativ au
              făcut obiectul unor sesizări la Curtea Constituțională.
            </Typography>
          </Box>

          <Box>
            <Stack alignItems='center' direction='row' gap={2} mb={4}>
              <Typography variant='subtitle1'>Selectează anul</Typography>
              <Select
                defaultValue={legalExPostEvaluationYears?.[0].evalYear}
                labelId='year'
                onChange={(event) => {
                  setSelectedLegalYear(event.target.value as string);
                }}
                value={selectedLegalYear}
              >
                {legalExPostEvaluationYears?.map(({ evalYear }) => (
                  <MenuItem key={evalYear} value={evalYear}>
                    {evalYear}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <ControlLegalExPostEvaluation selectedYear={selectedLegalYear} />
          </Box>
        </Stack>
      )}

      {tabValue === 1 && !isLoadingImpactExPostEvaluationYears && (
        <Stack gap={12}>
          <Box borderRadius={2} boxShadow={3} px={6} py={4}>
            <Typography gutterBottom variant='subtitle1'>
              Ce este evaluarea ex-post de impact?
            </Typography>
            <Typography textAlign='justify'>
              <strong>Evaluarea ex-post de impact</strong> reprezintă analiza
              care stabilește eficiența actului normativ, îndeplinirea scopului
              și a obiectivelor actului normativ, posibilitatea de a îmbunătăți
              implementarea actului normativ.
            </Typography>
          </Box>

          <Box>
            <Stack alignItems='center' direction='row' gap={2} mb={4}>
              <Typography variant='subtitle1'>Selectează anul</Typography>
              <Select
                defaultValue={impactExPostEvaluationYears?.[0].evalYear}
                labelId='year'
                onChange={(event) => {
                  setSelectedImpactYear(event.target.value as string);
                }}
                value={selectedImpactYear}
              >
                {impactExPostEvaluationYears?.map(({ evalYear }) => (
                  <MenuItem key={evalYear} value={evalYear}>
                    {evalYear}
                  </MenuItem>
                ))}
              </Select>
            </Stack>

            <ControlImpactExPostEvaluation selectedYear={selectedImpactYear} />
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
