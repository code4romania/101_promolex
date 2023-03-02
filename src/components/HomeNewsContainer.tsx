import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEventsQuery } from '../queries';
import { Routes } from '../types';
import { BlogPostCard } from './BlogPostCard';
import { Loading } from './Loading';

export function HomeNewsContainer() {
  const { data, isLoading } = useEventsQuery();

  const [latestEvent, ...otherEvents] = data?.slice(0, 3) ?? [];

  return (
    <Stack gap={4}>
      <Box
        color='common.white'
        bgcolor='secondary.main'
        px={16}
        py={2}
        sx={{
          borderTopRightRadius: 99,
          borderBottomRightRadius: 99,
        }}
        width='max-content'
      >
        <Typography>Noutăți</Typography>
      </Box>
      {isLoading ? (
        <Loading />
      ) : (
        <Grid columnSpacing={7} container rowSpacing={15}>
          <Grid item sm={4} height={600}>
            <BlogPostCard event={latestEvent} />
          </Grid>
          <Grid container item sm={8}>
            {otherEvents.map((event) => (
              <Grid key={event.eid} item sm={6}>
                <BlogPostCard event={event} />
              </Grid>
            ))}
            <Grid item sm={12} mt='auto'>
              <Box textAlign='right'>
                <Link to={Routes.News} style={{ textDecoration: 'none' }}>
                  <Button
                    color='primary'
                    variant='text'
                    endIcon={<ArrowForwardIosRoundedIcon fontSize='small' />}
                  >
                    Vezi toate noutățile
                  </Button>
                </Link>
              </Box>
              <Box bgcolor='secondary.main' borderRadius={2} height={12} />
            </Grid>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
}
