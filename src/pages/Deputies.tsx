import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DeputyCard } from "../components";

export const Deputies = () => {
  return (
    <Stack gap={4}>
      <Box boxShadow={2}>
        <Container>
          <Stack direction="row" py={8}>
            <Typography fontWeight={700} variant="h2">
              Deputați
            </Typography>
          </Stack>
        </Container>
      </Box>
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
          <Grid item>
            <DeputyCard fullName="Ion Căprioară" party="PAS" />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
