import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';
import parse from 'html-react-parser';
import { Link as RouterLink } from 'react-router-dom';
import { options } from '../constants';
import { Event } from '../types';

type BlogPostCardProps = {
  event: Event;
};

export function BlogPostCard({ event }: BlogPostCardProps) {
  const { palette, typography } = useTheme();

  return (
    <Card raised sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <CardMedia
        sx={{ minHeight: 192 }}
        image={event.logo}
        title={event.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          color='grey.500'
          fontWeight={typography.fontWeightMedium}
          variant='body2'
        >
          {event.pubdate}
        </Typography>
        <RouterLink
          to={`/noutati/detalii/${event.eid}`}
          style={{ color: 'unset', textDecoration: 'none' }}
        >
          <Typography
            gutterBottom
            variant='h6'
            sx={{
              '&:hover': { color: palette.secondary.main },
              cursor: 'pointer',
            }}
          >
            {event.title}
          </Typography>
        </RouterLink>
        {parse(event.shortDescription, options)}
      </CardContent>
      <CardActions>
        <RouterLink
          to={`/noutati/detalii/${event.eid}`}
          style={{ textDecoration: 'none' }}
        >
          <Button color='secondary' size='small' variant='contained'>
            Citește mai mult
          </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
}
