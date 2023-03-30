import SearchIcon from '@mui/icons-material/Search';
import { Button, ButtonGroup, Stack, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { PageContainer } from '../components';
import {
  useCurrentLegislatureQuery,
  useFactionsByLegislatureQuery,
} from '../queries';
import { RoutesParams, Routes } from '../types';

type OutletContext = {
  search: string;
};

export const useDeputiesSearch = () => useOutletContext<OutletContext>().search;

export function Deputies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { fid: fidParam } = useParams<RoutesParams>();
  const {
    data: lid,
    isLoading: isLoadingLid,
    isError: isErrorLoadingLid,
  } = useCurrentLegislatureQuery();

  const {
    data: factions,
    isLoading: isLoadingFactions,
    isError: isErrorLoadingFactions,
  } = useFactionsByLegislatureQuery(lid);

  const isLoading = isLoadingLid || isLoadingFactions;
  const isError = isErrorLoadingLid || isErrorLoadingFactions;

  const onFilterDeputies = useCallback(
    (fid?: string) => () => {
      if (!fid) {
        navigate(Routes.Deputies);
        return;
      }

      navigate(`${Routes.Deputies}/${fid}`);
    },
    [navigate],
  );

  return (
    <PageContainer pageTitle='Deputați'>
      <Stack alignItems='center' direction='row' pb={4}>
        <ButtonGroup
          disabled={isLoading || isError}
          disableRipple
          variant='contained'
          sx={{
            mr: 'auto',
          }}
        >
          <Button
            onClick={onFilterDeputies()}
            sx={{ backgroundColor: !fidParam ? 'primary.dark' : undefined }}
          >
            Toți deputații
          </Button>
          {factions?.map(({ fid, shortName }) => (
            <Button
              key={`${fid}-${shortName}`}
              onClick={onFilterDeputies(fid)}
              sx={{
                backgroundColor: fidParam === fid ? 'primary.dark' : undefined,
              }}
            >
              {shortName}
            </Button>
          ))}
        </ButtonGroup>
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
      <Outlet context={{ search }} />
    </PageContainer>
  );
}
