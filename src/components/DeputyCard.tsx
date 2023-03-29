import {
  alpha,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

type DeputyCardProps = {
  factionShortName: string;
  fullName: string;
  isActive: boolean;
  photo?: string;
};

export function DeputyCard({
  factionShortName,
  fullName,
  isActive,
  photo,
}: DeputyCardProps) {
  return (
    <Card sx={{ position: 'relative' }}>
      {!isActive && (
        <Box
          bgcolor={alpha('#fff', 0.5)}
          height={1}
          sx={{ position: 'absolute' }}
          width={1}
          zIndex={100}
        />
      )}
      <CardActionArea disableRipple>
        <CardMedia
          component='img'
          height='320'
          image={photo ?? 'https://via.placeholder.com/150.png?text=Fără+poză'}
          alt={fullName}
        />
        <CardContent>
          <Typography variant='subtitle1' component='div'>
            {fullName}
          </Typography>
          <Typography variant='subtitle2'>
            {factionShortName === 'Neafiliați' ? 'Neafiliat' : factionShortName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

DeputyCard.defaultProps = {
  photo: 'https://via.placeholder.com/150.png?text=Fără+poză',
};
