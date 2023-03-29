import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import LaunchIcon from '@mui/icons-material/Launch';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { ChartData } from 'chart.js';
import { capitalize, keys, values } from 'lodash';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  BarChart,
  DeputyActivity,
  DeputyStatisticsCard,
  DeputyWealth,
  DetailsDialog,
  LegislationInitiativeDetails,
  PageContainer,
} from '../components';
import { DeputyLegislationInitiatives } from '../components/DeputyLegislationInitiatives';
import { useDeputyDetailsQuery } from '../queries';
import { RoutesParams } from '../types';

const BAR_COLOR_MAP = ['#88A9B5', '#E9C699', '#EE7C83'];

export function DeputyDetails() {
  const { did } = useParams<RoutesParams>();
  const { data } = useDeputyDetailsQuery(did);

  const [open, setOpen] = useState(false);
  const [docId, setDocId] = useState('');

  const votingChartData: ChartData<'bar', number[], string> = useMemo(() => {
    const labels = keys(data?.voting).map((label) =>
      label === 'abtinut' ? 'Nu a votat' : capitalize(label),
    );
    const datasets = values(data?.voting).map((value, index) => ({
      label: labels[index],
      data: [parseInt(value, 10)],
      backgroundColor: BAR_COLOR_MAP[index],
    }));

    return { labels: ['Voturi'], datasets };
  }, [data?.voting]);

  const sessionsChartData: ChartData<'bar', number[], string> = useMemo(
    () => ({
      labels: ['Sesiuni plenare'],
      datasets: [
        {
          label: 'Prezent(ă)',
          data: [data?.sessionsPresentAbsent?.presents ?? 0],
          backgroundColor: BAR_COLOR_MAP[0],
        },
        {
          label: 'Absent(ă)',
          data: [data?.sessionsPresentAbsent?.absents ?? 0],
          backgroundColor: BAR_COLOR_MAP[1],
        },
      ],
    }),
    [
      data?.sessionsPresentAbsent?.absents,
      data?.sessionsPresentAbsent?.presents,
    ],
  );

  return (
    <>
      <PageContainer pageTitle={data?.fullName ?? 'Anonim'}>
        <Grid container columnSpacing={10} rowSpacing={8}>
          <Grid item xs md={3}>
            <Stack gap={5}>
              <Box
                borderRadius={2}
                height={{ xs: 400, sm: 300 }}
                sx={{
                  backgroundImage: `url(${
                    data?.photo ??
                    'https://via.placeholder.com/150.png?text=Fără+poză'
                  })`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <Stack gap={1}>
                {data?.factionsShortName !== 'Neafiliați' && (
                  <Typography fontWeight={700} variant='h6'>
                    Fracțiunea parlamentară
                  </Typography>
                )}
                <Stack
                  alignItems='center'
                  border={1}
                  borderColor='secondary.main'
                  borderRadius={2}
                  boxShadow={3}
                  direction='row'
                  gap={4}
                  px={2}
                  py={4}
                >
                  <Typography fontWeight={700} variant='subtitle1'>
                    {data?.factionsShortName}
                  </Typography>
                  <Typography>
                    {data?.factionsShortName === 'Neafiliați'
                      ? 'Deputat(ă) neafiliat(ă)'
                      : data?.factionName
                          ?.replace('Fracțiunea parlamentară', '')
                          .replaceAll('"', '')}
                  </Typography>
                </Stack>
              </Stack>

              <Stack
                border={1}
                borderColor='secondary.main'
                borderRadius={2}
                boxShadow={3}
                gap={4}
                px={6}
                py={4}
              >
                <Stack
                  alignItems='center'
                  direction='row'
                  gap={1}
                  justifyContent='center'
                >
                  <Link
                    color='grey.400'
                    component={IconButton}
                    disabled={!data?.linkedIn}
                    href={data?.linkedIn}
                    size='small'
                    target='_blank'
                    sx={{
                      '&:hover': {
                        color: '#0A66C2',
                      },
                    }}
                  >
                    <LinkedInIcon fontSize='large' />
                  </Link>
                  <Link
                    color='grey.400'
                    component={IconButton}
                    disabled={!data?.facebook}
                    href={data?.facebook}
                    size='small'
                    target='_blank'
                    sx={{
                      '&:hover': {
                        color: '#1877F2',
                      },
                    }}
                  >
                    <FacebookRoundedIcon fontSize='large' />
                  </Link>
                  <Link
                    color='grey.400'
                    component={IconButton}
                    disabled={!data?.instagram}
                    href={data?.instagram}
                    size='small'
                    target='_blank'
                    sx={{
                      '&:hover': {
                        color: '#BC2A8D',
                      },
                    }}
                  >
                    <InstagramIcon fontSize='large' />
                  </Link>
                  <Link
                    color='grey.400'
                    component={IconButton}
                    disabled={!data?.tweeter}
                    href={data?.tweeter}
                    size='small'
                    target='_blank'
                    sx={{
                      '&:hover': {
                        color: '#1DA1F2',
                      },
                    }}
                  >
                    <TwitterIcon fontSize='large' />
                  </Link>
                </Stack>
                <Box>
                  <Typography fontWeight={700}>Date de contact</Typography>
                  {!data?.phone && !data?.emailWork && !data?.emailPersonal && (
                    <Typography fontWeight={600}>-</Typography>
                  )}
                  {data?.phone && (
                    <Typography fontWeight={600}>{data.phone}</Typography>
                  )}
                  {data?.emailWork && (
                    <Tooltip arrow placement='top' title={data.emailWork ?? ''}>
                      <Typography fontWeight={600} noWrap>
                        <Link href={`mailto:${data.emailWork}`}>
                          {data.emailWork}
                        </Link>
                      </Typography>
                    </Tooltip>
                  )}
                  {data?.emailPersonal && (
                    <Typography fontWeight={600} noWrap>
                      <Link href={`mailto:${data.emailPersonal}`}>
                        {data.emailPersonal}
                      </Link>
                    </Typography>
                  )}
                </Box>

                <Box>
                  <Typography fontWeight={700}>Profesia</Typography>
                  <Typography>
                    {data?.profession ? data?.profession : '-'}
                  </Typography>
                </Box>

                <Box>
                  <Typography fontWeight={700}>Studii</Typography>
                  {data?.license && (
                    <Typography>Licență: {data?.license}</Typography>
                  )}
                  {data?.master && (
                    <Typography>Master: {data?.master}</Typography>
                  )}
                  {data?.doctorat && (
                    <Typography>Doctorat: {data?.doctorat}</Typography>
                  )}
                </Box>

                <Stack direction='row' columnGap={8} flexWrap='wrap' rowGap={5}>
                  <Box>
                    <Typography fontWeight={700}>Anul nașterii</Typography>
                    <Typography fontWeight={600}>
                      {data?.birthYear ? data?.birthYear : '-'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontWeight={700}>Domiciliul</Typography>
                    <Typography>
                      {data?.homeAddress ? data?.homeAddress : '-'}
                    </Typography>
                  </Box>
                </Stack>

                {data?.curriculumVitae && (
                  <Stack alignItems='center' direction='row' gap={4}>
                    <Box
                      alignItems='center'
                      bgcolor='secondary.main'
                      borderRadius={99}
                      color='common.white'
                      display='flex'
                      justifyContent='center'
                      p={2}
                    >
                      <TextSnippetIcon />
                    </Box>
                    <Box>
                      <Typography fontWeight={700}>Curriculum Vitae</Typography>
                      <Typography color='#9CA3AF'>Vezi documentul</Typography>
                    </Box>
                    <Link href={data.curriculumVitae} target='_blank'>
                      <LaunchIcon />
                    </Link>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs md={9}>
            <Grid container columnSpacing={12} rowSpacing={10}>
              <Grid item xs={12}>
                <DeputyActivity
                  committee={data?.committee}
                  delegates={data?.delegates}
                  investigationCommittees={data?.investigateComissions}
                  friendships={data?.friendships}
                  mandatesCount={data?.nrMandates}
                  mandatesDetails={data?.mandatesDetails}
                  specialCommittees={data?.specialComissions}
                />
                <Divider variant='fullWidth' />
              </Grid>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard title='Votul deputatului'>
                  <BarChart chartHeight={100} data={votingChartData} />
                </DeputyStatisticsCard>
              </Grid>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard
                  onClick={
                    data?.author !== '0' ? () => setOpen(true) : undefined
                  }
                  title='Inițiative legislative'
                >
                  {data?.author !== '0' && (
                    <Typography color='#88A9B5' fontSize={60} fontWeight={700}>
                      {data?.author}
                    </Typography>
                  )}
                  {data?.author === '0' && (
                    <Typography textAlign='center'>
                      Acest deputat nu a înregistrat pentru moment nici o
                      inițiativă legislativă
                    </Typography>
                  )}
                </DeputyStatisticsCard>
              </Grid>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard title='Prezența la ședințe plenare'>
                  <BarChart chartHeight={100} data={sessionsChartData} />
                </DeputyStatisticsCard>
              </Grid>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard title='Întrebări și interpelări adresate instituțiilor publice'>
                  {data?.questionsInterpelations !== '0' && (
                    <Typography color='#88A9B5' fontSize={60} fontWeight={700}>
                      {data?.questionsInterpelations}
                    </Typography>
                  )}
                  {data?.questionsInterpelations === '0' && (
                    <Typography textAlign='center'>
                      Acest deputat nu a înregistrat pentru moment nici o
                      întrebare sau interpelare adresată instituțiilor publice
                    </Typography>
                  )}
                </DeputyStatisticsCard>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider variant='fullWidth' />
          </Grid>
          <Grid item xs={12}>
            <DeputyWealth did={did ?? ''} />
          </Grid>
        </Grid>
      </PageContainer>

      <DetailsDialog open={open} handleClose={() => setOpen(false)}>
        <DeputyLegislationInitiatives
          did={did ?? ''}
          onShowDetails={(id) => setDocId(id)}
        />
      </DetailsDialog>

      <DetailsDialog open={Boolean(docId)} handleClose={() => setDocId('')}>
        <LegislationInitiativeDetails docId={docId} />
      </DetailsDialog>
    </>
  );
}
