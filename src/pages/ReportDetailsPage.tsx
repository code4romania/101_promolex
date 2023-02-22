import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import {
  Box,
  Breadcrumbs,
  Grid,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import parse, {
  HTMLReactParserOptions,
  Element,
  domToReact,
} from 'html-react-parser';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { DownloadLink, Loading } from '../components';
import { useReportDetailsQuery } from '../queries';

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === 'p') {
      return <Typography>{domToReact(domNode.children)}</Typography>;
    }

    return domNode;
  },
};

const BreadCrumbLink = styled(RouterLink)(({ theme }) => ({
  alignItems: 'center',
  color: theme.palette.grey[500],
  display: 'flex',
  fontWeight: 500,

  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export function ReportDetailsPage() {
  const { rid } = useParams<{ rid: string }>();

  const { data: report, isLoading } = useReportDetailsQuery(rid ?? '');

  return (
    <>
      <Breadcrumbs
        separator={<NavigateNextIcon color='inherit' fontSize='large' />}
        sx={{ color: 'grey.200' }}
      >
        <BreadCrumbLink to='/'>
          <HomeRoundedIcon />
        </BreadCrumbLink>
        <BreadCrumbLink to='/publicatii'>Publicații</BreadCrumbLink>
        <Typography color='grey.500' fontWeight='medium'>
          {report?.title}
        </Typography>
      </Breadcrumbs>
      {isLoading ? (
        <Loading />
      ) : (
        <Box py={5}>
          <Typography fontWeight='medium' gutterBottom variant='h5'>
            {report?.title}
          </Typography>
          <Typography color='grey.500' fontWeight='medium' fontSize={20}>
            Data publicării:{' '}
            <Typography color='grey.800' component='span' fontSize={20}>
              {report?.pubdate}
            </Typography>
          </Typography>
          <Grid container columnSpacing={8} mt={8}>
            <Grid item>
              <Box sx={{ width: 220, height: 320, bgcolor: 'grey.400' }} />
            </Grid>
            <Grid item xs>
              <Typography color='grey.800' gutterBottom variant='h6'>
                Scurtă descriere/rezumat
              </Typography>
              {parse(report?.shortDescription ?? '', options)}

              <Stack alignItems='center' direction='row' gap={4} mt={8}>
                <DownloadLink href={report?.fileRo} download>
                  Română
                </DownloadLink>
                <Typography fontSize={20}>|</Typography>
                <DownloadLink href={report?.fileEn} download>
                  Engleză
                </DownloadLink>
                <Typography fontSize={20}>|</Typography>
                <DownloadLink href={report?.fileRu} download>
                  Rusă
                </DownloadLink>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
}
