import { Box, Grid, Link, Stack, Typography, styled } from '@mui/material';
import { Report } from '../types';

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: 20,
  textDecoration: 'none',

  '&:hover': {
    fontWeight: theme.typography.fontWeightMedium,
    textDecoration: 'underline',
  },
}));

type ReportItemProps = {
  report: Report;
};

export function ReportItem({ report }: ReportItemProps) {
  const { title, fileRo, fileEn, fileRu, pubdate } = report;
  return (
    <Grid container columnSpacing={8}>
      <Grid item>
        <Box sx={{ width: 188, height: 270, bgcolor: 'grey.400' }} />
      </Grid>
      <Grid item xs>
        <Typography color='grey.900' variant='h6' gutterBottom>
          {title}
        </Typography>
        <Typography color='grey.500' fontWeight='medium'>
          Data publicării: <Typography component='span'>{pubdate}</Typography>
        </Typography>

        <Stack alignItems='center' direction='row' gap={4} mt={8}>
          <StyledLink href={fileRo} target='_blank'>
            Română
          </StyledLink>
          <Typography fontSize={20}>|</Typography>
          <StyledLink href={fileEn} target='_blank'>
            Engleză
          </StyledLink>
          <Typography fontSize={20}>|</Typography>
          <StyledLink href={fileRu} target='_blank'>
            Rusă
          </StyledLink>
        </Stack>
      </Grid>
    </Grid>
  );
}
