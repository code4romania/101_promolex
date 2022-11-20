import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { ChartData } from "chart.js";
import { capitalize, keys, values } from "lodash";
import { Fragment, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  DeputyActivity,
  DeputyStatisticsCard,
  DeputyWealth,
  Header,
} from "../components";
import { CARD_BORDER } from "../constants";
import { useDeputyDetailsQuery } from "../queries";
import { RoutesParams } from "../types";

const BAR_COLOR_MAP = ["#88A9B5", "#E9C699", "#EE7C83"];

export const DeputyDetails = () => {
  const { did } = useParams<RoutesParams>();
  const { data, isLoading } = useDeputyDetailsQuery(did);

  const votingChartData: ChartData<"bar", number[], string> = useMemo(() => {
    const labels = keys(data?.voting).map((label) => capitalize(label));
    const datasets = values(data?.voting).map((value, index) => ({
      label: labels[index],
      data: [parseInt(value)],
      backgroundColor: BAR_COLOR_MAP[index],
    }));

    return { labels: ["Voturi"], datasets };
  }, [data?.voting]);

  return !isLoading ? (
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
                <DeputyStatisticsCard title="Votul deputatului">
                  <BarChart chartHeight={60} data={votingChartData} />
                </DeputyStatisticsCard>
              </Grid>
              <Grid item md={6} xs={12}>
                <DeputyStatisticsCard title="Inițiative legislative">
                  <Typography color="#88A9B5" fontSize={60} fontWeight={700}>
                    {data?.author ?? 0}
                  </Typography>
                </DeputyStatisticsCard>
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
            <DeputyWealth />
          </Grid>
        </Grid>
      </Container>
    </Stack>
  ) : (
    <div>loading</div>
  );
};
