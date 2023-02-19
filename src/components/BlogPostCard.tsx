import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  useTheme,
} from '@mui/material';

export function BlogPostCard() {
  const { palette, typography } = useTheme();

  return (
    <Card raised>
      <CardMedia
        sx={{ height: 192 }}
        // image='/static/images/cards/contemplative-reptile.jpg'
        // title='green iguana'
      />
      <CardContent>
        <Typography
          color='grey.500'
          fontWeight={typography.fontWeightMedium}
          variant='body2'
        >
          01/09/2023
        </Typography>
        <Typography
          gutterBottom
          variant='h6'
          sx={{
            '&:hover': { color: palette.secondary.main },
            cursor: 'pointer',
          }}
        >
          APEL PUBLIC: Asociația Promo-LEX solicită Parlamentului ajustarea
          proiectului Codului electoral conform recomandărilor Comisiei de la
          Veneția și OSCE/ODIHR
        </Typography>
        <Typography color='text.secondary'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
          accusantium praesentium eius, ut atque fuga culpa, similique sequi cum
          eos quis dolorum.
        </Typography>
      </CardContent>
      <CardActions>
        <Button color='secondary' size='small' variant='contained'>
          Citește mai mult
        </Button>
      </CardActions>
    </Card>
  );
}
