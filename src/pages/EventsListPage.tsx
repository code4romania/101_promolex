import SearchIcon from '@mui/icons-material/Search';
import { Grid, Stack, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { BlogPostCard, Loading } from '../components';
import { useEventsQuery } from '../queries';

export function EventsListPage() {
  const [search, setSearch] = useState('');

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
      </Stack>

      {isLoading ? (
        <Loading />
      ) : (
        <Grid columnSpacing={5} container rowSpacing={15} py={10}>
          {filteredEvents.map((event) => (
            <Grid item key={event.eid} sm={4}>
              <BlogPostCard event={event} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
