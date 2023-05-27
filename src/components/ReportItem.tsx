import { Box, Grid, Stack, Typography } from '@mui/material';
import { filter } from 'lodash';
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Report } from '../types';
import { formatDate } from '../utils';
import { DownloadLink } from './DownloadLink';

type ReportItemProps = {
  report: Report;
};

export function ReportItem({ report }: ReportItemProps) {
  const { rid, title, fileRo, fileEn, fileRu, pubdate, reportLogo } = report;
  const urls = useMemo(
    () =>
      filter(
        [
          { url: fileRo, label: 'Română' },
          { url: fileEn, label: 'Engleză' },
          { url: fileRu, label: 'Rusă' },
        ],
        'url',
      ),
    [fileEn, fileRo, fileRu],
  );
  return (
    <Grid container columnSpacing={8}>
      <Grid item xs={12} md={3}>
        <RouterLink to={`detalii/${rid}`}>
          <Box height={320} textAlign='center' width={1}>
            <img height='100%' width='auto' src={reportLogo} alt='title' />
          </Box>
        </RouterLink>
      </Grid>
      <Grid display={{ xs: 'none', md: 'block' }} item xs={12} md={9}>
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
          Data publicării:{' '}
          <Typography component='span'>{formatDate(pubdate)}</Typography>
        </Typography>

        <Stack alignItems='center' direction='row' gap={4} mt={8}>
          {urls.map(({ url, label }, index, arr) =>
            url ? (
              <>
                <DownloadLink key={url} href={url} download target='_blank'>
                  {label}
                </DownloadLink>
                {index !== arr.length - 1 && <Typography>|</Typography>}
              </>
            ) : null,
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
