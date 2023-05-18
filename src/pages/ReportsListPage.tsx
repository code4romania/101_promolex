import SearchIcon from '@mui/icons-material/Search';
import {
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { sortBy } from 'lodash';
import { useMemo, useState } from 'react';
import { Loading, ReportItem } from '../components';
import { useReportsQuery } from '../queries';

export function ReportsListPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('pubdate-newest');

  const { data: reports, isLoading } = useReportsQuery();

  const filteredReports = useMemo(
    () =>
      reports?.filter((report) =>
        report.title
          .split(' ')
          .some((word) => word.toLowerCase().includes(search.toLowerCase())),
      ) ?? [],
    [reports, search],
  );

  const sortedReports = useMemo(() => {
    if (sort === 'pubdate-newest') {
      return sortBy(filteredReports, (report) => report.pubdate).reverse();
    }
    if (sort === 'pubdate-oldest') {
      return sortBy(filteredReports, (report) => report.pubdate);
    }
    return sortBy(filteredReports, (report) => report.title);
  }, [filteredReports, sort]);

  return (
    <>
      <Grid container pt={8} spacing={4}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: <SearchIcon color='disabled' />,
            }}
            placeholder='Caută...'
            onChange={(event) => setSearch(event.target.value)}
            value={search}
          />
        </Grid>

        <Grid display={{ xs: 'none', md: 'block' }} item xs={12} md={5} />

        <Grid item xs={12} md={3}>
          <Stack
            alignItems='center'
            direction='row'
            gap={2}
            justifyContent='flex-end'
          >
            <Typography variant='subtitle1' whiteSpace='nowrap'>
              Sortează după
            </Typography>
            <Select
              fullWidth
              onChange={(event) => setSort(event.target.value as string)}
              value={sort}
            >
              <MenuItem value='pubdate-newest'>Cele mai noi</MenuItem>
              <MenuItem value='pubdate-oldest'>Cele mai vechi</MenuItem>
              <MenuItem value='title'>Nume</MenuItem>
            </Select>
          </Stack>
        </Grid>
      </Grid>
      {isLoading ? (
        <Loading />
      ) : (
        <Stack gap={12} py={10}>
          {sortedReports.map((report) => (
            <ReportItem key={report.rid} report={report} />
          ))}
        </Stack>
      )}
    </>
  );
}
