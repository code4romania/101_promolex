import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { deburr, sortBy } from "lodash";
import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { DeputyCard, Header } from "../components";
import { useCurrentLegislatureQuery } from "../queries";
import { useDeputiesByLegislatureQuery } from "../queries/useDeputiesByLegislatureQuery";
import { Routes } from "../types";

export const Deputies = () => {
  const {
    data: lid,
    isLoading: isLoadingLid,
    isError: isErrorLoadingLid,
  } = useCurrentLegislatureQuery();

  const {
    data: deputies,
    isLoading: isLoadingDeputies,
    isError: isErrorLoadingDeputies,
  } = useDeputiesByLegislatureQuery(lid);

  const isLoading = isLoadingLid || isLoadingDeputies;
  const isError = isErrorLoadingLid || isErrorLoadingDeputies;

  const sortedDeputies = useMemo(
    () =>
      sortBy(deputies, ({ full_name }) =>
        deburr(full_name).replaceAll(/Ș/g, "S")
      ) ?? [],
    [deputies]
  );

  return (
    <Stack gap={4}>
      <Header title="Deputați" />
      <Container>
        <Box pb={4}>
          <ButtonGroup
            disabled={isLoading || isError}
            disableRipple
            variant="contained"
          >
            <Button sx={{ backgroundColor: "primary.dark" }}>
              Toți deputații
            </Button>
            <Button>PAS</Button>
            <Button>BCS</Button>
            <Button>ȘOR</Button>
          </ButtonGroup>
        </Box>
        {isLoading || isError ? (
          <Stack alignItems="center" gap={4} justifyContent="center" py={8}>
            {isLoading && (
              <Fragment>
                <Typography variant="h5">
                  Se încarcă lista cu deputați
                </Typography>
                <CircularProgress size={24} />
              </Fragment>
            )}
            {isError && (
              <Fragment>
                <Typography variant="h5">
                  Ne pare rău a apărut o eroare. Vă rugăm încercați mai târziu
                </Typography>
              </Fragment>
            )}
          </Stack>
        ) : (
          <Grid container columnSpacing={3} rowSpacing={4}>
            {sortedDeputies?.map(
              ({ did, factions_short_name, full_name, photo }) => (
                <Grid key={did} item>
                  <Link
                    to={`${Routes.Deputies}/${did}`}
                    style={{ textDecoration: "none" }}
                  >
                    <DeputyCard
                      fullName={full_name}
                      factionShortName={factions_short_name}
                      photo={photo}
                    />
                  </Link>
                </Grid>
              )
            )}
          </Grid>
        )}
      </Container>
    </Stack>
  );
};
