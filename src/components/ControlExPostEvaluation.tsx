import {
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTabs } from '../hooks';
import { SecondaryTab, SecondaryTabs } from './SecondaryTabs';
import { StatisticsBarChart } from './StatisticsBarChart';

export function ControlExportEvaluation() {
  const { tabValue, handleTabChange } = useTabs();

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

      {tabValue === 0 && (
        <>
          <Box borderRadius={2} boxShadow={3} px={6} py={4}>
            <Typography gutterBottom variant='h6'>
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

          <Stack alignItems='center' direction='row' gap={2}>
            <Typography variant='h6'>Selectează anul</Typography>
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
                  data: [85],
                  backgroundColor: '#88A9B5',
                  datalabels: {
                    formatter(value) {
                      return `${value}%`;
                    },
                  },
                },
                {
                  label: 'Nerealizat',
                  data: [15],
                  backgroundColor: '#BAE2F1',
                  datalabels: {
                    formatter(value) {
                      return `${value}%`;
                    },
                  },
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  align: 'start',
                },
              },
            }}
            title='Nivelul de realizare a Planului de Evaluare Ex-post Juridică'
          />

          <Typography fontWeight='bold' variant='h4'>
            Află mai multe despre
          </Typography>
          <Stack direction='row' gap={4}>
            <Button color='secondary' size='large' variant='contained'>
              Planul de evaluare ex-post
            </Button>
            <Button color='secondary' size='large' variant='contained'>
              Rapoartele de evaluare ex-post juridică a actelor normative
            </Button>
          </Stack>
        </>
      )}

      {tabValue === 1 && (
        <>
          <Box borderRadius={2} boxShadow={3} px={6} py={4}>
            <Typography gutterBottom variant='h6'>
              Ce este evaluarea ex-post de impact?
            </Typography>
            <Typography>
              <strong>Evaluarea ex-post de impact</strong> reprezintă analiza
              care stabilește eficiența actului normativ, îndeplinirea scopului
              și a obiectivelor actului normativ, posibilitatea de a îmbunătăți
              implementarea actului normativ.
            </Typography>
          </Box>

          <Stack alignItems='center' direction='row' gap={2}>
            <Typography variant='h6'>Selectează anul</Typography>
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
                  data: [85],
                  backgroundColor: '#88A9B5',
                  datalabels: {
                    formatter(value) {
                      return `${value}%`;
                    },
                  },
                },
                {
                  label: 'Nerealizat',
                  data: [15],
                  backgroundColor: '#BAE2F1',
                  datalabels: {
                    formatter(value) {
                      return `${value}%`;
                    },
                  },
                },
              ],
            }}
            options={{
              plugins: {
                legend: {
                  align: 'start',
                },
              },
            }}
            title='Nivelul de realizare a Planului de Evaluare Ex-post de Impact'
          />

          <Typography fontWeight='bold' variant='h4'>
            Află mai multe despre
          </Typography>
          <Stack direction='row' gap={4}>
            <Button color='secondary' size='large' variant='contained'>
              Planul de evaluare ex-post
            </Button>
            <Button color='secondary' size='large' variant='contained'>
              Rapoartele de evaluare ex-post de impact a actelor normative
            </Button>
          </Stack>
        </>
      )}
    </Stack>
  );
}
