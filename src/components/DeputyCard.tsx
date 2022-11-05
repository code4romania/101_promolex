import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type DeputyCardProps = {
  factionShortName: string;
  fullName: string;
  photo?: string;
};

export const DeputyCard = ({
  factionShortName,
  fullName,
  photo,
}: DeputyCardProps) => {
  return (
    <Card sx={{ minWidth: 220 }}>
      <CardActionArea disableRipple>
        <CardMedia
          component="img"
          height="180"
          image={photo ?? "https://via.placeholder.com/150.png?text=Fără+poză"}
          alt={fullName}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {fullName}
          </Typography>
          <Typography variant="subtitle2">{factionShortName}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
