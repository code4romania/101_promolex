import { Box, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Report } from '../types';
import { DownloadLink } from './DownloadLink';

type ReportItemProps = {
  report: Report;
};

export function ReportItem({ report }: ReportItemProps) {
  const { rid, title, fileRo, fileEn, fileRu, pubdate } = report;
  return (
    <Grid container columnSpacing={8}>
      <Grid item>
        {/* @todo missing image from report data. Ask from API */}
        <Box sx={{ width: 188, height: 270, bgcolor: 'grey.400' }} />
      </Grid>
      <Grid item xs>
        <Typography
          color='grey.900'
          component={RouterLink}
          gutterBottom
          to={`detalii/${rid}`}
          variant='h6'
          sx={{
            textDecoration: 'none',

            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          {title}
        </Typography>
        <Typography color='grey.500' fontWeight='medium'>
          Data publicării: <Typography component='span'>{pubdate}</Typography>
        </Typography>

        <Stack alignItems='center' direction='row' gap={4} mt={8}>
          <DownloadLink href={fileRo} download>
            Română
          </DownloadLink>
          <Typography fontSize={20}>|</Typography>
          <DownloadLink href={fileEn} download>
            Engleză
          </DownloadLink>
          <Typography fontSize={20}>|</Typography>
          <DownloadLink href={fileRu} download>
            Rusă
          </DownloadLink>
        </Stack>
      </Grid>
    </Grid>
  );
}
