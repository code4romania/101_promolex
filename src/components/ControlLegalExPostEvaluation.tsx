import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useCommitteeExPostEvaluationByLegislatureQuery } from '../queries';
import { StatisticsBarChart } from './StatisticsBarChart';

export type ControlLegalExPostEvaluation = {
  selectedYear: string;
};
export function ControlLegalExPostEvaluation({
  selectedYear,
}: ControlLegalExPostEvaluation) {
  const { data: legalExPostEvaluation } =
    useCommitteeExPostEvaluationByLegislatureQuery('Juridică', selectedYear, {
      enabled: !!selectedYear,
      refetchOnMount: false,
    });

  return (
    <>
      <Stack direction='row' gap={4} height={100} mb={4}>
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
            ex-post juridică a actelor normative
          </Typography>
        </Button>
      </Stack>

      <Box>
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
                  parseInt(legalExPostEvaluation?.gradNerealizat ?? '0', 10),
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
              tooltip: {
                callbacks: {
                  title() {
                    return [
                      'Nivelul de realizare a Planului de',
                      'Evaluare Ex-post Juridică',
                    ];
                  },
                },
              },
              legend: {
                align: 'start',
              },
            },
          }}
          title={
            <span>
              Nivelul de realizare a Planului de Evaluare{' '}
              <span style={{ whiteSpace: 'nowrap' }}>Ex-post</span> Juridică
            </span>
          }
        />
        <Typography mt={2}>
          Ultima actualizare: {legalExPostEvaluation?.dataUpdate ?? '-'}
        </Typography>
      </Box>
    </>
  );
}
