import {
  Box,
  Button,
  Link,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTabs } from '../hooks';
import { useCommitteeExPostEvaluationByLegislatureQuery } from '../queries';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { StatisticsBarChart } from './StatisticsBarChart';

export function ControlExportEvaluation() {
  const { tabValue, handleTabChange } = useTabs();

  const {
    data: legalExPostEvaluation,
    isInitialLoading: isLoadingLegalExPostEvaluation,
  } = useCommitteeExPostEvaluationByLegislatureQuery('Juridică', {
    enabled: tabValue === 0,
    refetchOnMount: false,
  });

  const {
    data: impactExPostEvaluation,
    isInitialLoading: isLoadingImpactExPostEvaluation,
  } = useCommitteeExPostEvaluationByLegislatureQuery('De impact', {
    enabled: tabValue === 1,
    refetchOnMount: false,
  });

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

      {tabValue === 0 && !isLoadingLegalExPostEvaluation && (
        <Stack gap={12}>
          <Box borderRadius={2} boxShadow={3} px={6} py={4}>
            <Typography gutterBottom variant='subtitle1'>
              Ce este evaluarea ex-post juridică?
            </Typography>
            <Typography>
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
              <Select labelId='year' value={2023}>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
              </Select>
            </Stack>

            <StatisticsBarChart
              data={{
                labels: [
                  'Nivelul de realizare a Planului de Evaluare Ex-post Juridică',
                ],
                datasets: [
                  {
                    label: 'Realizat',
                    data: [
                      parseInt(legalExPostEvaluation?.gradRealizare ?? '0', 10),
                    ],
                    backgroundColor: '#88A9B5',
                    datalabels: {
                      formatter(value) {
                        return `${value}%`;
                      },
                    },
                  },
                  {
                    label: 'Nerealizat',
                    data: [
                      parseInt(
                        legalExPostEvaluation?.gradNerealizat ?? '0',
                        10,
                      ),
                    ],
                    backgroundColor: '#BAE2F1',
                    datalabels: {
                      formatter(value) {
                        return `${value}%`;
                      },
                    },
                  },
                ],
              }}
              maxWidth={600}
              options={{
                plugins: {
                  legend: {
                    align: 'start',
                  },
                },
              }}
              title='Nivelul de realizare a Planului de Evaluare Ex-post Juridică'
            />
          </Box>

          <Box>
            <Typography fontWeight='bold' variant='h5' gutterBottom>
              Află mai multe despre
            </Typography>
            <Stack direction='row' gap={4} height={100}>
              <Button
                color='secondary'
                href={legalExPostEvaluation?.planEvaluare ?? ''}
                LinkComponent={Link}
                target='_blank'
                size='large'
                variant='contained'
                sx={{ maxWidth: 220 }}
              >
                Planul de evaluare ex-post
              </Button>
              <Button
                color='secondary'
                href={legalExPostEvaluation?.linkRaportEvaluare ?? ''}
                LinkComponent={Link}
                size='large'
                target='_blank'
                variant='contained'
                sx={{ maxWidth: 220 }}
              >
                Rapoartele de evaluare ex-post juridică a actelor normative
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}

      {tabValue === 1 && !isLoadingImpactExPostEvaluation && (
        <Stack gap={12}>
          <Box borderRadius={2} boxShadow={3} px={6} py={4}>
            <Typography gutterBottom variant='subtitle1'>
              Ce este evaluarea ex-post de impact?
            </Typography>
            <Typography>
              <strong>Evaluarea ex-post de impact</strong> reprezintă analiza
              care stabilește eficiența actului normativ, îndeplinirea scopului
              și a obiectivelor actului normativ, posibilitatea de a îmbunătăți
              implementarea actului normativ.
            </Typography>
          </Box>

          <Box>
            <Stack alignItems='center' direction='row' gap={2} mb={4}>
              <Typography variant='subtitle1'>Selectează anul</Typography>
              <Select labelId='year' value={2023}>
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2022}>2022</MenuItem>
                <MenuItem value={2023}>2023</MenuItem>
              </Select>
            </Stack>

            <StatisticsBarChart
              data={{
                labels: [
                  'Nivelul de realizare a Planului de Evaluare Ex-post de Impact',
                ],
                datasets: [
                  {
                    label: 'Realizat',
                    data: [
                      parseInt(
                        impactExPostEvaluation?.gradRealizare ?? '0',
                        10,
                      ),
                    ],
                    backgroundColor: '#88A9B5',
                    datalabels: {
                      formatter(value) {
                        return `${value}%`;
                      },
                    },
                  },
                  {
                    label: 'Nerealizat',
                    data: [
                      parseInt(
                        impactExPostEvaluation?.gradNerealizat ?? '0',
                        10,
                      ),
                    ],
                    backgroundColor: '#BAE2F1',
                    datalabels: {
                      formatter(value) {
                        return `${value}%`;
                      },
                    },
                  },
                ],
              }}
              maxWidth={600}
              options={{
                plugins: {
                  legend: {
                    align: 'start',
                  },
                },
              }}
              title='Nivelul de realizare a Planului de Evaluare Ex-post de Impact'
            />
          </Box>

          <Box>
            <Typography fontWeight='bold' variant='h5' gutterBottom>
              Află mai multe despre
            </Typography>
            <Stack direction='row' gap={4} height={100}>
              <Button
                color='secondary'
                href={impactExPostEvaluation?.planEvaluare ?? ''}
                LinkComponent={Link}
                size='large'
                target='_blank'
                variant='contained'
                sx={{ maxWidth: 220 }}
              >
                Planul de evaluare ex-post
              </Button>
              <Button
                color='secondary'
                href={impactExPostEvaluation?.linkRaportEvaluare ?? ''}
                LinkComponent={Link}
                size='large'
                target='_blank'
                variant='contained'
                sx={{ maxWidth: 220 }}
              >
                Rapoartele de evaluare ex-post de impact a actelor normative
              </Button>
            </Stack>
          </Box>
        </Stack>
      )}
    </Stack>
  );
}
