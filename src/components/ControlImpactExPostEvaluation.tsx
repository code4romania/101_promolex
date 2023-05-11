import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useCommitteeExPostEvaluationByLegislatureQuery } from '../queries';
import { StatisticsBarChart } from './StatisticsBarChart';

type ControlImpactExPostEvaluationProps = {
  selectedYear: string;
};
export function ControlImpactExPostEvaluation({
  selectedYear,
}: ControlImpactExPostEvaluationProps) {
  const { data: impactExPostEvaluation } =
    useCommitteeExPostEvaluationByLegislatureQuery('De impact', selectedYear, {
      enabled: !!selectedYear,
      refetchOnMount: false,
    });

  return (
    <>
      <Stack direction='row' gap={4} height={100} mb={4}>
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
          sx={{
            flexDirection: 'column',
            maxWidth: 220,
            textAlign: 'center',
          }}
        >
          <Typography color='inherit' fontSize='inherit' fontWeight='inherit'>
            Rapoartele de evaluare
          </Typography>
          <Typography color='inherit' fontSize='inherit' fontWeight='inherit'>
            ex-post de impact a actelor normative
          </Typography>
        </Button>
      </Stack>

      <Box>
        <StatisticsBarChart
          data={{
            labels: [
              'Nivelul de realizare a Planului de Evaluare Ex-post de Impact',
            ],
            datasets: [
              {
                label: 'Realizat',
                data: [
                  parseInt(impactExPostEvaluation?.gradRealizare ?? '0', 10),
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
                  parseInt(impactExPostEvaluation?.gradNerealizat ?? '0', 10),
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
        <Typography mt={2}>
          Ultima actualizare: {impactExPostEvaluation?.dataUpdate ?? '-'}
        </Typography>
      </Box>
    </>
  );
}
