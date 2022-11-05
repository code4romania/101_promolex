import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import { DeputyCard, Header } from "../components";
import { Routes } from "../types";

export const Deputies = () => {
  return (
    <Stack gap={4}>
      <Header title="Deputați" />
      <Container>
        <Box pb={4}>
          <ButtonGroup disableRipple variant="contained">
            <Button sx={{ backgroundColor: "primary.dark" }}>
              Toți deputații
            </Button>
            <Button>PAS</Button>
            <Button>BCS</Button>
            <Button>ȘOR</Button>
          </ButtonGroup>
        </Box>
        <Grid container columnSpacing={3} rowSpacing={4}>
          <Grid item>
            <Link to={`${Routes.Deputies}/1`}>
              <DeputyCard fullName="Ion Căprioară" party="PAS" />
            </Link>
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
