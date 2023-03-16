import { Box, Grid, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Report } from '../types';
import { DownloadLink } from './DownloadLink';

type ReportItemProps = {
  report: Report;
};

export function ReportItem({ report }: ReportItemProps) {
  const { rid, title, fileRo, fileEn, fileRu, pubdate, reportLogo } = report;
  return (
    <Grid container columnSpacing={8}>
      <Grid item xs={12} md={3}>
        <Box height={320} width={1}>
          <img height='100%' width='auto' src={reportLogo} alt='title' />
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
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
          textAlign='justify'
        >
          {title}
        </Typography>
        <Typography color='grey.500' fontWeight='medium'>
          Data publicării: <Typography component='span'>{pubdate}</Typography>
        </Typography>

        <Stack alignItems='center' direction='row' gap={4} mt={8}>
          <DownloadLink href={fileRo} download target='_blank'>
            Română
          </DownloadLink>
          <Typography>|</Typography>
          <DownloadLink href={fileEn} download target='_blank'>
            Engleză
          </DownloadLink>
          <Typography>|</Typography>
          <DownloadLink href={fileRu} download target='_blank'>
            Rusă
          </DownloadLink>
        </Stack>
      </Grid>
    </Grid>
  );
}
