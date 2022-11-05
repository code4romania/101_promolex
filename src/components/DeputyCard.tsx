import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type DeputyCardProps = {
  fullName: string;
  image?: string;
  party: string;
};

export const DeputyCard = ({ fullName, image, party }: DeputyCardProps) => {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea disableRipple>
        <CardMedia
          component="img"
          height="180"
          image={image ?? "https://via.placeholder.com/150.png?text=Fără+poză"}
          alt={fullName}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {fullName}
          </Typography>
          <Typography variant="subtitle2">{party}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
