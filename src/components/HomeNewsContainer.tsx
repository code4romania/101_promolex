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
          <Grid item xs={12} md={5} height={640}>
            <BlogPostCard event={latestEvent} />
          </Grid>
          <Grid container item xs={12} md={7} columnSpacing={7} rowSpacing={15}>
            {otherEvents.map((event) => (
              <Grid key={event.eid} item xs={12} md={6}>
                <BlogPostCard event={event} />
              </Grid>
            ))}
            <Grid item xs={12} mt='auto'>
              <Box textAlign='right' pb={4}>
                <Link to={Routes.News} style={{ textDecoration: 'none' }}>
                  <Button
                    color='secondary'
                    variant='outlined'
                    endIcon={<ArrowForwardIosRoundedIcon fontSize='small' />}
                    size='large'
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
