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
import { BlogPostCard, Loading } from '../components';
import { useEventsQuery } from '../queries';

export function EventsListPage() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('pubdate-newest');

  const { data: events, isLoading } = useEventsQuery();

  const filteredEvents = useMemo(
    () =>
      events?.filter((event) =>
        event.title
          .split(' ')
          .some((word) => word.toLowerCase().includes(search.toLowerCase())),
      ) ?? [],
    [events, search],
  );

  const sortedReports = useMemo(() => {
    if (sort === 'pubdate-newest') {
      return sortBy(filteredEvents, (event) => event.pubdate).reverse();
    }
    if (sort === 'pubdate-oldest') {
      return sortBy(filteredEvents, (event) => event.pubdate);
    }
    return sortBy(filteredEvents, (event) => event.title);
  }, [filteredEvents, sort]);

  return (
    <>
      <Stack direction='row' pt={12}>
        <TextField
          fullWidth
          InputProps={{
            startAdornment: <SearchIcon color='disabled' />,
          }}
          placeholder='Caută...'
          onChange={(event) => setSearch(event.target.value)}
          sx={{
            maxWidth: 330,
          }}
          value={search}
        />

        <Stack
          alignItems='center'
          direction='row'
          gap={2}
          ml={{ xs: 0, sm: 'auto' }}
        >
          <Typography variant='subtitle1'>Sortează după</Typography>
          <Select
            onChange={(event) => setSort(event.target.value as string)}
            sx={{
              minWidth: 145,
            }}
            value={sort}
          >
            <MenuItem value='pubdate-newest'>Cele mai noi</MenuItem>
            <MenuItem value='pubdate-oldest'>Cele mai vechi</MenuItem>
            <MenuItem value='title'>Nume</MenuItem>
          </Select>
        </Stack>
      </Stack>

      {isLoading ? (
        <Loading />
      ) : (
        <Grid columnSpacing={5} container rowSpacing={15} py={10}>
          {sortedReports.map((event) => (
            <Grid item key={event.eid} sm={4}>
              <BlogPostCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
