import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LaunchIcon from "@mui/icons-material/Launch";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ChartData } from "chart.js";
import { capitalize, keys, values } from "lodash";
import { Fragment, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BarChart,
  DeputyActivity,
  DeputyStatisticsCard,
  DeputyWealth,
  DetailsDialog,
  Header,
  LegislationInitiativeDetails,
} from "../components";
import { DeputyLegislationInitiatives } from "../components/DeputyLegislationInitiatives";
import { useDeputyDetailsQuery } from "../queries";
import { RoutesParams } from "../types";

const BAR_COLOR_MAP = ["#88A9B5", "#E9C699", "#EE7C83"];

export const DeputyDetails = () => {
  const { did } = useParams<RoutesParams>();
  const { data } = useDeputyDetailsQuery(did);

  const [open, setOpen] = useState(false);
  const [docId, setDocId] = useState("");

  const votingChartData: ChartData<"bar", number[], string> = useMemo(() => {
    const labels = keys(data?.voting).map((label) => capitalize(label));
    const datasets = values(data?.voting).map((value, index) => ({
      label: labels[index],
      data: [parseInt(value)],
      backgroundColor: BAR_COLOR_MAP[index],
    }));

    return { labels: ["Voturi"], datasets };
  }, [data?.voting]);

  const sessionsChartData: ChartData<"bar", number[], string> = useMemo(
    () => ({
      labels: ["Sesiuni plenare"],
      datasets: [
        {
          label: "Prezent",
          data: [data?.sessions_present_absent?.presents ?? 0],
          backgroundColor: BAR_COLOR_MAP[0],
        },
        {
          label: "Absent",
          data: [data?.sessions_present_absent?.absents ?? 0],
          backgroundColor: BAR_COLOR_MAP[1],
        },
      ],
    }),
    [
      data?.sessions_present_absent?.absents,
      data?.sessions_present_absent?.presents,
    ]
  );

  return (
    <Fragment>
      <Stack gap={4}>
        <Header title={data?.full_name ?? "Anonim"} />
        <Container>
          <Grid container columnSpacing={10} rowSpacing={8}>
            <Grid item xs md={3}>
              <Stack gap={5}>
                <Box
                  borderRadius={2}
                  height={300}
                  sx={{
                    backgroundImage: `url(${
                      data?.photo ??
                      "https://via.placeholder.com/150.png?text=Fără+poză"
                    })`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />

                <Stack gap={1}>
                  <Typography fontWeight={700} variant="h6">
                    Fracțiunea parlamentară
                  </Typography>
                  <Stack
                    alignItems="center"
                    border={1}
                    borderColor="secondary.main"
                    borderRadius={2}
                    boxShadow={3}
                    direction="row"
                    gap={4}
                    px={2}
                    py={4}
                  >
                    <Typography fontWeight={700} variant="subtitle1">
                      {data?.factions_short_name}
                    </Typography>
                    <Typography>
                      {data?.faction_name
                        ?.replace("Fracțiunea parlamentară", "")
                        .replaceAll('"', "")}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack
                  border={1}
                  borderColor="secondary.main"
                  borderRadius={2}
                  boxShadow={3}
                  gap={4}
                  px={6}
                  py={4}
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    gap={1}
                    justifyContent="center"
                  >
                    <Link
                      component={IconButton}
                      disabled={!data?.linkedIn}
                      href={data?.linkedIn}
                      size="small"
                      target="_blank"
                    >
                      <LinkedInIcon fontSize="large" />
                    </Link>
                    <Link
                      component={IconButton}
                      disabled={!data?.facebook}
                      href={data?.facebook}
                      size="small"
                      target="_blank"
                    >
                      <FacebookRoundedIcon fontSize="large" />
                    </Link>
                    <Link
                      component={IconButton}
                      disabled={!data?.instagram}
                      href={data?.instagram}
                      size="small"
                      target="_blank"
                    >
                      <InstagramIcon fontSize="large" />
                    </Link>
                    <Link
                      component={IconButton}
                      disabled={!data?.tweeter}
                      href={data?.tweeter}
                      size="small"
                      target="_blank"
                    >
                      <TwitterIcon fontSize="large" />
                    </Link>
                  </Stack>
                  <Box>
                    <Typography fontWeight={700}>Date de contact</Typography>
                    {!data?.phone &&
                      !data?.email_work &&
                      !data?.email_personal && (
                        <Typography fontWeight={600}>-</Typography>
                      )}
                    {data?.phone && (
                      <Typography fontWeight={600}>{data.phone}</Typography>
                    )}
                    {data?.email_work && (
                      <Tooltip
                        arrow
                        placement="top"
                        title={data.email_work ?? ""}
                      >
                        <Typography fontWeight={600} noWrap>
                          {data.email_work}
                        </Typography>
                      </Tooltip>
                    )}
                    {data?.email_personal && (
                      <Typography fontWeight={600}>
                        {data.email_personal}
                      </Typography>
                    )}
                  </Box>

                  <Box>
                    <Typography fontWeight={700}>Profesia</Typography>
                    <Typography>
                      {data?.profession ? data?.profession : "-"}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography fontWeight={700}>Studii</Typography>
                    <Typography>
                      Licență: {data?.license ? data?.license : "-"}
                    </Typography>
                    <Typography>
                      Master: {data?.master ? data?.master : "-"}
                    </Typography>
                    <Typography>
                      Doctorat: {data?.doctorat ? data?.doctorat : "-"}
                    </Typography>
                  </Box>

                  <Stack
                    direction="row"
                    columnGap={8}
                    flexWrap="wrap"
                    rowGap={5}
                  >
                    <Box>
                      <Typography fontWeight={700}>Anul nașterii</Typography>
                      <Typography fontWeight={600}>
                        {data?.birth_year ? data?.birth_year : "-"}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography fontWeight={700}>Domiciliul</Typography>
                      <Typography>
                        {data?.home_address ? data?.home_address : "-"}
                      </Typography>
                    </Box>
                  </Stack>

                  {data?.curriculum_vitae && (
                    <Stack alignItems="center" direction="row" gap={4}>
                      <Box
                        alignItems="center"
                        bgcolor="secondary.main"
                        borderRadius={99}
                        color="common.white"
                        display="flex"
                        justifyContent="center"
                        p={2}
                      >
                        <TextSnippetIcon />
                      </Box>
                      <Box>
                        <Typography fontWeight={700}>
                          Curriculum Vitae
                        </Typography>
                        <Typography color="#9CA3AF">Vezi documentul</Typography>
                      </Box>
                      <Link href={data.curriculum_vitae} target="_blank">
                        <LaunchIcon />
                      </Link>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Grid>

            <Grid item md>
              <Grid container columnSpacing={3} rowSpacing={7}>
                <Grid item xs={12}>
                  <DeputyActivity
                    committee={data?.committee}
                    delegates={data?.delegates}
                    investigationCommittees={data?.investigate_comissions}
                    friendships={data?.friendships}
                    mandatesCount={data?.nr_mandates}
                    specialCommittees={data?.special_comissions}
                  />
                  <Divider variant="fullWidth" />
                </Grid>
                <Grid item md={6} xs={12}>
                  <DeputyStatisticsCard title="Votul deputatului">
                    <BarChart chartHeight={60} data={votingChartData} />
                  </DeputyStatisticsCard>
                </Grid>
                <Grid item md={6} xs={12}>
                  <DeputyStatisticsCard
                    onClick={() => setOpen(true)}
                    title="Inițiative legislative"
                  >
                    <Typography color="#88A9B5" fontSize={60} fontWeight={700}>
                      {data?.author ?? 0}
                    </Typography>
                  </DeputyStatisticsCard>
                </Grid>
                <Grid item md={6} xs={12}>
                  <DeputyStatisticsCard title="Prezența la ședintele plenare">
                    <BarChart chartHeight={60} data={sessionsChartData} />
                  </DeputyStatisticsCard>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider variant="fullWidth" />
            </Grid>
            <Grid item xs={12}>
              <DeputyWealth did={did ?? ""} />
            </Grid>
          </Grid>
        </Container>
      </Stack>
      <DetailsDialog open={open} handleClose={() => setOpen(false)}>
        <DeputyLegislationInitiatives
          did={did ?? ""}
          onShowDetails={(docId: string) => setDocId(docId)}
        />
      </DetailsDialog>
      <DetailsDialog open={Boolean(docId)} handleClose={() => setDocId("")}>
        <LegislationInitiativeDetails docId={docId} />
      </DetailsDialog>
    </Fragment>
  );
};
