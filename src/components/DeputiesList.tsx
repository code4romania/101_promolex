import { Stack, Typography, CircularProgress, Grid } from '@mui/material';
import { deburr, orderBy } from 'lodash';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDeputiesSearch } from '../pages';
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
  const search = useDeputiesSearch();

  const filteredDeputies = useMemo(
    () =>
      search
        ? deputies?.filter(({ fullName }) =>
            fullName
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase()
              .includes(
                search
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '')
                  .toLowerCase(),
              ),
          )
        : deputies,
    [deputies, search],
  );

  const sortedDeputies = useMemo(
    () =>
      orderBy(
        filteredDeputies,
        ['depStatus', ({ fullName }) => deburr(fullName).replaceAll(/Ș/g, 'S')],
        ['desc', 'asc'],
      ) ?? [],
    [filteredDeputies],
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
    <Grid container columnSpacing={10} rowSpacing={10}>
      {sortedDeputies?.map(
        ({ depStatus, did, factionsShortName, fullName, photo }) => (
          <Grid key={did} item xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`${Routes.Deputies}/detalii/${did}`}
              style={{ textDecoration: 'none' }}
            >
              <DeputyCard
                fullName={fullName}
                factionShortName={factionsShortName}
                isActive={depStatus === '1'}
                photo={photo}
              />
            </Link>
          </Grid>
        ),
      )}
    </Grid>
  );
}

DeputiesList.defaultProps = {
  deputies: [],
};
