import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Grid, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { BreadCrumbLink, DownloadLink, Loading } from '../components';
import { options } from '../constants';
import { useReportDetailsQuery } from '../queries';
import { Routes } from '../types';

export function ReportDetailsPage() {
  const { rid } = useParams<{ rid: string }>();

  const { data: report, isLoading } = useReportDetailsQuery(rid ?? '');

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon color='inherit' fontSize='large' />}
        sx={{ color: 'grey.200' }}
      >
        <BreadCrumbLink to={Routes.Home}>
          <HomeRoundedIcon />
        </BreadCrumbLink>
        <BreadCrumbLink to={Routes.Reports}>Publicații</BreadCrumbLink>
        <Typography color='grey.500' fontWeight='medium' textAlign='justify'>
          {report?.title}
        </Typography>
      </Breadcrumbs>
      {isLoading ? (
        <Loading />
      ) : (
        <Box py={5}>
          <Typography fontWeight='medium' gutterBottom variant='h4'>
            {report?.title}
          </Typography>
          <Typography color='grey.500' fontWeight='medium' variant='subtitle1'>
            Data publicării:{' '}
            <Typography color='grey.800' component='span' variant='subtitle1'>
              {report?.pubdate}
            </Typography>
          </Typography>
          <Grid container columnSpacing={8} mt={8}>
            <Grid item>
              <Box
                sx={{
                  backgroundImage: `url(${report?.reportLogo})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'contain',
                  bgcolor: 'grey.400',
                  height: 320,
                  width: 220,
                }}
              />
            </Grid>
            <Grid item xs>
              <Typography color='grey.800' gutterBottom variant='subtitle1'>
                Scurtă descriere/rezumat
              </Typography>
              {parse(report?.shortDescription ?? '', options)}

              <Stack alignItems='center' direction='row' gap={4} mt={8}>
                <DownloadLink href={report?.fileRo} download target='_blank'>
                  Română
                </DownloadLink>
                <Typography>|</Typography>
                <DownloadLink href={report?.fileEn} download target='_blank'>
                  Engleză
                </DownloadLink>
                <Typography>|</Typography>
                <DownloadLink href={report?.fileRu} download target='_blank'>
                  Rusă
                </DownloadLink>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
