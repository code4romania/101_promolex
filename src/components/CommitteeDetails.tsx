import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Box, Link, Stack, styled, Typography, useTheme } from '@mui/material';
import { deburr } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import { useDeputiesByCommitteeQuery } from '../queries';

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

type CommitteeDetailsProps = {
  cid: string;
};

export function CommitteeDetails({ cid }: CommitteeDetailsProps) {
  const { typography } = useTheme();

  const { data: committee } = useDeputiesByCommitteeQuery(cid);

  const committeePresidents =
    committee?.filter(
      ({ comFunction }) =>
        deburr(comFunction.toLowerCase()).replaceAll(/ș/g, 's') ===
        'presedinte',
    ) ?? [];

  const committeeVicePresidents =
    committee?.filter(
      ({ comFunction }) =>
        deburr(comFunction.toLowerCase()).replaceAll(/ș/g, 's') ===
        'vicepresedinte',
    ) ?? [];

  const committeeSecretaries =
    committee?.filter(
      ({ comFunction }) => comFunction.toLowerCase() === 'secretar',
    ) ?? [];

  const committeeMembers =
    committee?.filter(
      ({ comFunction }) => comFunction.toLowerCase() === 'membru',
    ) ?? [];

  return (
    <Stack
      border={1}
      borderColor='#82969D'
      borderRadius={1}
      gap={4}
      px={8}
      py={7}
    >
      <Typography fontWeight={typography.fontWeightBold}>
        Componența comisiei
      </Typography>

      <Stack direction='row' gap={6}>
        {committeePresidents.map((president) => (
          <Box key={president.did}>
            <Typography
              component={StyledLink}
              to={`/deputati/detalii/${president.did}`}
            >
              {president.fullName}
            </Typography>
            <Typography fontWeight={typography.fontWeightBold}>
              {president.comFunction}
            </Typography>
          </Box>
        ))}
        {committeeVicePresidents.map((vicePresident) => (
          <Box key={vicePresident.did}>
            <Typography
              component={StyledLink}
              to={`/deputati/detalii/${vicePresident.did}`}
            >
              {vicePresident.fullName}
            </Typography>
            <Typography fontWeight={typography.fontWeightBold}>
              {vicePresident.comFunction}
            </Typography>
          </Box>
        ))}
        {committeeSecretaries.map((secretary) => (
          <Box key={secretary.did}>
            <Typography
              component={StyledLink}
              to={`/deputati/detalii/${secretary.did}`}
            >
              {secretary.fullName}
            </Typography>
            <Typography fontWeight={typography.fontWeightBold}>
              {secretary.comFunction}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack direction='row' gap={6}>
        {committeeMembers.map((member) => (
          <Box key={member.did}>
            <Typography
              component={StyledLink}
              to={`/deputati/detalii/${member.did}`}
            >
              {member.fullName}
            </Typography>
            <Typography>Membru</Typography>
          </Box>
        ))}
      </Stack>

      {/* @todo missing committee email from committee data. Ask from API */}
      <Stack gap={2}>
        <Typography fontWeight={typography.fontWeightBold}>
          Date de contact ale comisiei
        </Typography>
        <Stack alignItems='center' direction='row' gap={3}>
          <EmailOutlinedIcon />
          <Typography
            component={Link}
            href='email:'
            underline='none'
            variant='body2'
          >
            Poșta electronică
          </Typography>
        </Stack>
      </Stack>

      {/* @todo missing auditionsOrganized from committee data. Ask from API */}
      <Stack gap={2}>
        <Typography fontWeight={typography.fontWeightBold}>
          Audieri organizate
        </Typography>

        <Box>
          <Typography
            alignItems='center'
            component={Stack}
            direction='row'
            fontWeight={typography.fontWeightBold}
            gap={1}
            variant='body2'
          >
            Subiect:
            <Typography fontSize='inherit'>
              Audierea instituției / dezbateri publice
            </Typography>
          </Typography>

          <Typography
            alignItems='center'
            component={Stack}
            direction='row'
            fontSize='inherit'
            fontWeight={typography.fontWeightBold}
            gap={1}
          >
            Data:
            <Typography fontSize='inherit'>10.10.2021</Typography>
          </Typography>
        </Box>
      </Stack>

      {/* @todo missing committeeMeetings from committee data. Ask from API */}
      <Stack gap={2}>
        <Typography fontWeight={typography.fontWeightBold}>
          Ședințele comisiei
        </Typography>
      </Stack>
    </Stack>
  );
}
