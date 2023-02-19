import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Box, Link, Stack, styled, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const StyledLink = styled(RouterLink)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: 'none',
  '&:hover': {
    color: '#29829E',
    fontWeight: theme.typography.fontWeightBold,
  },
}));

export function CommitteeDetails() {
  const { typography } = useTheme();

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
        <Box>
          <Typography component={StyledLink} to=''>
            Stamate Olesea
          </Typography>
          <Typography fontWeight={typography.fontWeightBold}>
            Președinte
          </Typography>
        </Box>
        <Box>
          <Typography component={StyledLink} to=''>
            Bolea Vasile
          </Typography>
          <Typography fontWeight={typography.fontWeightBold}>
            Vicepreședinte
          </Typography>
        </Box>
        <Box>
          <Typography component={StyledLink} to=''>
            Roșca Veronica
          </Typography>
          <Typography fontWeight={typography.fontWeightBold}>
            Vicepreședinte
          </Typography>
        </Box>
        <Box>
          <Typography component={StyledLink} to=''>
            Chiriac Igor
          </Typography>
          <Typography fontWeight={typography.fontWeightBold}>
            Secretar
          </Typography>
        </Box>
      </Stack>

      <Stack direction='row' gap={6}>
        {[].map((member) => (
          <Box key={member}>
            <Typography component={StyledLink} to=''>
              Chiriac Igor
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
            href='email:'
            underline='none'
            variant='body2'
          >
            Poșta electronică
          </Typography>
        </Stack>
      </Stack>

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

      <Stack gap={2}>
        <Typography fontWeight={typography.fontWeightBold}>
          Ședințele comisiei
        </Typography>
      </Stack>
    </Stack>
  );
}
