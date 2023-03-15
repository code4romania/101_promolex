import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';
import parse, {
  domToReact,
  HTMLReactParserOptions,
  Element,
} from 'html-react-parser';
import { Link as RouterLink } from 'react-router-dom';
import { Event } from '../types';

export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === 'p') {
      return (
        <Typography
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            lineClamp: 4,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxHeight: 110,
            textAlign: 'justify',
          }}
        >
          {domToReact(domNode.children, { trim: true })}
        </Typography>
      );
    }

    return domNode;
  },
};

type BlogPostCardProps = {
  event: Event;
};

export function BlogPostCard({ event }: BlogPostCardProps) {
  const { palette, typography } = useTheme();

  return (
    <Card raised sx={{ display: 'flex', flexDirection: 'column', height: 1 }}>
      <CardMedia
        sx={{ backgroundSize: 'contain', pt: '56.25%' }}
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
            variant='subtitle1'
            sx={{
              '&:hover': { color: palette.secondary.main },
              cursor: 'pointer',

              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              lineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxHeight: 100,
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
