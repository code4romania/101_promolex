import { Box, Button, ButtonGroup, Container, Stack } from '@mui/material';
import { useCallback } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Header } from '../components';
import {
  useCurrentLegislatureQuery,
  useFactionsByLegislatureQuery,
} from '../queries';
import { RoutesParams, Routes } from '../types';

export function Deputies() {
  const navigate = useNavigate();
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
    <Stack gap={4}>
      <Header title='Deputați' />
      <Container>
        <Box pb={4}>
          <ButtonGroup
            disabled={isLoading || isError}
            disableRipple
            variant='contained'
          >
            <Button
              onClick={onFilterDeputies()}
              sx={{ backgroundColor: !fidParam ? 'primary.dark' : undefined }}
            >
              Toți deputații
            </Button>
            {factions?.map(({ fid, short_name }) => (
              <Button
                key={short_name}
                onClick={onFilterDeputies(fid)}
                sx={{
                  backgroundColor:
                    fidParam === fid ? 'primary.dark' : undefined,
                }}
              >
                {short_name}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
        <Outlet />
      </Container>
    </Stack>
  );
}
