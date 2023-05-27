import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Grid, Link, Stack, Typography, useTheme } from '@mui/material';
import { deburr } from 'lodash';
import { useCommitteeDetailsQuery } from '../queries';
import { formatDate } from '../utils';
import { StyledRouterLink } from './StyledRouterLink';

type CommitteeDetailsProps = {
  cid: string;
};

export function CommitteeDetails({ cid }: CommitteeDetailsProps) {
  const { typography } = useTheme();

  const { data: committee } = useCommitteeDetailsQuery(cid);

  const committeePresidents =
    committee?.members?.filter(
      ({ comFunction }) =>
        deburr(comFunction.toLowerCase()).replaceAll(/ș/g, 's') ===
        'presedinte',
    ) ?? [];

  const committeeVicePresidents =
    committee?.members?.filter(
      ({ comFunction }) =>
        deburr(comFunction.toLowerCase()).replaceAll(/ș/g, 's') ===
        'vicepresedinte',
    ) ?? [];

  const committeeSecretaries =
    committee?.members?.filter(
      ({ comFunction }) => comFunction.toLowerCase() === 'secretar',
    ) ?? [];

  const committeeMembers =
    committee?.members?.filter(
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
      maxHeight={520}
      overflow='auto'
    >
      <Typography fontWeight={typography.fontWeightBold}>
        Componența comisiei
      </Typography>

      <Stack direction='row' gap={6} flexWrap='wrap'>
        {committeePresidents.map((president) => (
          <Box key={president.did}>
            <Typography
              component={StyledRouterLink}
              to={`/deputati/detalii/${president.did}`}
              noWrap
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
              component={StyledRouterLink}
              to={`/deputati/detalii/${vicePresident.did}`}
              noWrap
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
              component={StyledRouterLink}
              to={`/deputati/detalii/${secretary.did}`}
              noWrap
            >
              {secretary.fullName}
            </Typography>
            <Typography fontWeight={typography.fontWeightBold}>
              {secretary.comFunction}
            </Typography>
          </Box>
        ))}
      </Stack>

      <Stack direction='row' gap={6} flexWrap='wrap'>
        {committeeMembers.map((member) => (
          <Box key={member.did}>
            <Typography
              component={StyledRouterLink}
              to={`/deputati/detalii/${member.did}`}
              noWrap
            >
              {member.fullName}
            </Typography>
            <Typography>Membru</Typography>
          </Box>
        ))}
      </Stack>

      <Stack gap={2}>
        <Typography fontWeight={typography.fontWeightBold}>
          Date de contact ale comisiei
        </Typography>
        <Stack alignItems='center' direction='row' gap={3}>
          <EmailOutlinedIcon />
          <Typography
            component={Link}
            fontWeight='bold'
            href={`mailto:${committee?.commEmail}`}
            variant='body2'
          >
            {committee?.commEmail}
          </Typography>
        </Stack>

        <Stack alignItems='center' direction='row' gap={2}>
          <PhoneIcon />
          <Typography
            component={Link}
            fontWeight='bold'
            href={`tel:${committee?.commPhone}`}
            variant='body2'
          >
            {committee?.commPhone}
          </Typography>
        </Stack>
      </Stack>

      {!!committee?.organizedHearings.length && (
        <Stack gap={2}>
          <Typography fontWeight={typography.fontWeightBold}>
            Audieri organizate
          </Typography>
          <Grid
            container
            rowSpacing={2}
            maxHeight={100}
            overflow='auto'
            columns={24}
          >
            {committee?.organizedHearings.map(
              ({ hearingType, dataSedinte }) => (
                <Grid item key={dataSedinte} md={4} xs={24} sm={8}>
                  <Typography
                    alignItems='center'
                    component={Stack}
                    direction='row'
                    fontWeight={typography.fontWeightBold}
                    gap={1}
                    variant='body2'
                  >
                    Subiect:
                    <Typography fontSize='inherit'>{hearingType}</Typography>
                  </Typography>

                  <Typography
                    alignItems='center'
                    component={Stack}
                    direction='row'
                    fontWeight={typography.fontWeightBold}
                    gap={1}
                    variant='body2'
                  >
                    Data:
                    <Typography fontSize='inherit'>
                      {formatDate(dataSedinte)}
                    </Typography>
                  </Typography>
                </Grid>
              ),
            )}
          </Grid>
        </Stack>
      )}

      {!!committee?.sessions.length && (
        <Stack gap={2}>
          <Typography fontWeight={typography.fontWeightBold}>
            Ședințele comisiei
          </Typography>

          <Stack
            columnGap={4}
            rowGap={2}
            flexDirection='row'
            flexWrap='wrap'
            maxHeight={100}
            overflow='auto'
          >
            {committee?.sessions.map(({ procesVerbal, dataSedinte }) => (
              <Box key={dataSedinte}>
                <Typography
                  alignItems='center'
                  color='primary.main'
                  component={Link}
                  href={procesVerbal}
                  fontWeight={typography.fontWeightBold}
                  variant='body2'
                  sx={{
                    '&:hover': {
                      color: 'primary.dark',
                    },
                  }}
                  target='_blank'
                >
                  Proces verbal
                </Typography>

                <Typography
                  alignItems='center'
                  component={Stack}
                  direction='row'
                  fontWeight={typography.fontWeightBold}
                  gap={1}
                  variant='body2'
                >
                  Data:
                  <Typography fontSize='inherit'>
                    {formatDate(dataSedinte)}
                  </Typography>
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
