import { Stack, Typography, CircularProgress, Grid } from '@mui/material';
import { sortBy, deburr } from 'lodash';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Deputy, Routes } from '../types';
import { DeputyCard } from './DeputyCard';

type DeputiesListProps = {
  deputies?: Deputy[];
  isError: boolean;
  isLoading: boolean;
};

export function DeputiesList({
  deputies,
  isError,
  isLoading,
}: DeputiesListProps) {
  const sortedDeputies = useMemo(
    () =>
      sortBy(deputies, ({ full_name }) =>
        deburr(full_name).replaceAll(/Ș/g, 'S'),
      ) ?? [],
    [deputies],
  );

  if (isError || isLoading || !sortedDeputies.length) {
    return (
      <Stack alignItems='center' gap={4} justifyContent='center' py={8}>
        {isLoading && (
          <>
            <Typography variant='h5'>Se încarcă lista cu deputați</Typography>
            <CircularProgress size={24} />
          </>
        )}
        {isError && (
          <Typography variant='h5'>
            Ne pare rău a apărut o eroare. Vă rugăm încercați mai târziu
          </Typography>
        )}
        {!isLoading && !isError && !sortedDeputies.length && (
          <Typography variant='h5'>Nu există deputați înregistrați</Typography>
        )}
      </Stack>
    );
  }

  return (
    <Grid container columnSpacing={3} rowSpacing={4}>
      {sortedDeputies?.map(({ did, factions_short_name, full_name, photo }) => (
        <Grid key={did} item>
          <Link
            to={`${Routes.Deputies}/detalii/${did}`}
            style={{ textDecoration: 'none' }}
          >
            <DeputyCard
              fullName={full_name}
              factionShortName={factions_short_name}
              photo={photo}
            />
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

DeputiesList.defaultProps = {
  deputies: [],
};
