import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { Fragment } from "react";
import { useParams } from "react-router-dom";
import { DeputyActivity, DeputyStatisticsCard, Header } from "../components";
import { CARD_BORDER } from "../constants";
import { useDeputyDetailsQuery } from "../queries";
import { RoutesParams } from "../types";

export const DeputyDetails = () => {
  const { did } = useParams<RoutesParams>();
  const { data } = useDeputyDetailsQuery(did);

  return (
    <Stack gap={4}>
      <Header title={data?.full_name ?? "Anonim"} />
      <Container>
        <Grid container columnSpacing={10} rowSpacing={8}>
          <Grid item xs md={4}>
            <Stack gap={5}>
              <Box
                borderRadius={2}
                height={300}
                bgcolor="red"
                sx={{
                  backgroundImage: `url(https://via.placeholder.com/150.png?text=Fără+poză)`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                maxWidth={300}
              />
              <Box>
                <Typography fontWeight={700}>Date de contact</Typography>
                <Typography fontWeight={500}>
                  {data?.phone}, {data?.email_work}, {data?.email_personal}
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={700}>Anul nașterii</Typography>
                <Typography fontWeight={500}>{data?.birth_year}</Typography>
              </Box>
              <Box>
                <Typography fontWeight={700}>Domiciliul</Typography>
                <Typography fontWeight={500}>{data?.home_address}</Typography>
              </Box>
              <Box>
                <Typography fontWeight={700}>Studii</Typography>
                {!data?.license && !data?.master && !data?.doctorat ? (
                  <Typography>Fără studii superioare</Typography>
                ) : (
                  <Fragment>
                    {data?.license && (
                      <Typography fontWeight={500}>
                        Licență: {data?.license}
                      </Typography>
                    )}
                    {data?.master && (
                      <Typography fontWeight={500}>
                        Master: {data?.master}
                      </Typography>
                    )}
                    {data?.doctorat && (
                      <Typography fontWeight={500}>
                        Doctorat: {data?.doctorat}
                      </Typography>
                    )}
                  </Fragment>
                )}
              </Box>
              <Box>
                <Typography fontWeight={700}>
                  Numărul de mandate deținute de deputat/Legislatura
                </Typography>
                <Typography fontWeight={500}>
                  {data?.mandates_details}
                </Typography>
              </Box>
              <Box>
                <Typography fontWeight={700}>Curriculum Vitae</Typography>
                {data?.curriculum_vitae && (
                  <Typography
                    component="a"
                    fontWeight={500}
                    href={data.curriculum_vitae}
                    target="_blank"
                  >
                    {data?.curriculum_vitae}
                  </Typography>
                )}
              </Box>
            </Stack>
          </Grid>
          <Grid item md>
            <Grid container columnSpacing={3} rowSpacing={7}>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard
                  title="Absențe la sedintele plenare"
                  count={parseInt(data?.sessions_absent ?? "")}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard
                  title="Inițiativele/propunerile legislative"
                  count={parseInt(data?.author ?? "")}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard
                  title="Absențe la ședința comisiilor parlamentare"
                  count={parseInt(data?.comissions_absent ?? "")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <DeputyActivity
              committee={data?.committee}
              delegates={data?.delegates}
              factionName={data?.faction_name}
              friendships={data?.friendships}
            />
            <Divider
              variant="fullWidth"
              sx={{ backgroundColor: CARD_BORDER }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={700} variant="h4">
              Declarația de venituri
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
