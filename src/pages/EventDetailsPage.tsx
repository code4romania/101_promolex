import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import parse from 'html-react-parser';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BreadCrumbLink, Loading } from '../components';
import { options } from '../constants';
import { useEventDetailsQuery } from '../queries';
import { Routes } from '../types';
import { formatDate } from '../utils';

export function EventDetailsPage() {
  const [openPreview, setOpenPreview] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const { eid } = useParams<{ eid: string }>();

  const { data: event, isLoading } = useEventDetailsQuery(eid ?? '');

  const onOpenPreview = (index: number) => {
    setCurrentIndex(index);
    setOpenPreview(true);
  };
  const onClosePreview = () => setOpenPreview(false);

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
        <Stack gap={3} py={5}>
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
                height: '100%',
                left: 0,
                margin: 'auto',
                objectFit: 'cover',
                position: 'absolute',
                right: 0,
                top: 0,
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

          <Box>{parse(event?.content ?? '', options)}</Box>

          {event?.photos && event?.photos.length > 0 && (
            <>
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

                <Grid container spacing={8} mt={8}>
                  {event?.photos.map(({ file }, index) => (
                    <Grid item key={file} xs={12} sm={4}>
                      <Box
                        height={280}
                        onClick={() => onOpenPreview(index)}
                        sx={{
                          backgroundImage: `url(${file})`,
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: 'cover',
                          cursor: 'pointer',
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
              <Dialog
                open={openPreview}
                onClose={onClosePreview}
                fullWidth
                fullScreen={isMobile}
              >
                <DialogContent sx={{ alignItems: 'center', display: 'flex' }}>
                  <Box flexGrow={1}>
                    <img
                      alt={event?.photos[currentIndex].file}
                      height='auto'
                      src={event?.photos[currentIndex].file}
                      width='100%'
                    />
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button color='secondary' onClick={onClosePreview}>
                    Închide
                  </Button>
                  <Button
                    color='secondary'
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    variant='contained'
                  >
                    Precedenta
                  </Button>
                  <Button
                    color='secondary'
                    disabled={currentIndex === (event?.photos.length ?? 0) - 1}
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    variant='contained'
                  >
                    Următoarea
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}
        </Stack>
      )}
    </>
  );
}
