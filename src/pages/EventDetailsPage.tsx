import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Grid, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { BreadCrumbLink, Loading } from '../components';
import { options } from '../constants';
import { useEventDetailsQuery } from '../queries';
import { Routes } from '../types';
import { formatDate } from '../utils';

export function EventDetailsPage() {
  const { eid } = useParams<{ eid: string }>();

  const { data: event, isLoading } = useEventDetailsQuery(eid ?? '');

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon color='inherit' fontSize='large' />}
        sx={{ color: 'grey.200' }}
      >
        <BreadCrumbLink to={Routes.Home}>
          <HomeRoundedIcon />
        </BreadCrumbLink>
        <BreadCrumbLink to={Routes.News}>Noutăți</BreadCrumbLink>
        <Typography color='grey.500' fontWeight='medium'>
          {event?.title}
        </Typography>
      </Breadcrumbs>
      {isLoading ? (
        <Loading />
      ) : (
        <Stack gap={8} py={5}>
          <Typography
            color='grey.900'
            fontWeight='medium'
            gutterBottom
            variant='h4'
          >
            {event?.title}
          </Typography>
          <Box pt='56.25%' position='relative'>
            <img
              alt={event?.title}
              style={{
                position: 'absolute',
                top: 0,
                height: '100%',
                objectFit: 'cover',
              }}
              src={event?.logo}
            />
          </Box>
          <Typography color='grey.500' fontWeight='medium' variant='subtitle1'>
            Data publicării:{' '}
            <Typography color='grey.800' component='span' variant='subtitle1'>
              {event?.pubdate ? formatDate(event.pubdate) : '-'}
            </Typography>
          </Typography>

          {parse(event?.content ?? '', options)}

          {event?.photos && event?.photos.length > 0 && (
            <Stack gap={5}>
              <Typography
                color='grey.900'
                fontWeight='medium'
                textTransform='uppercase'
                variant='h5'
              >
                Galerie foto
              </Typography>

              <Stack alignItems='center' direction='row'>
                <Box border={1} borderColor='grey.900' flexGrow={1} />
                <Box
                  bgcolor='grey.900'
                  border={1}
                  borderRadius={99}
                  borderColor='grey.900'
                  height={12}
                  width={12}
                />
              </Stack>

              <Grid container columnSpacing={8} mt={8}>
                {event?.photos.map(({ file }) => (
                  <Grid item key={file} sm={4}>
                    <Box
                      height={280}
                      sx={{
                        backgroundImage: `url(${file})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
}
