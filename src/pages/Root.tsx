import { Button, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Footer, Navbar } from '../components';
import { getConsent, setConsent as setConsentCookie } from '../utils';

export function Root() {
  const { zIndex } = useTheme();
  const [consent, setConsent] = useState(getConsent());
  const handleAcceptConsent = () => {
    setConsent('accepted');
    setConsentCookie();
  };

  return (
    <Stack height={1}>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />

      {consent !== 'accepted' && (
        <Stack
          alignItems='center'
          bgcolor='primary.main'
          bottom={0}
          direction='row'
          gap={3}
          justifyContent='center'
          left={0}
          position='fixed'
          px={2}
          py={4}
          right={0}
          zIndex={zIndex.tooltip + 1}
        >
          <Typography color='common.white' variant='subtitle1'>
            Acest website folosește cookie-uri. Navigând în continuare, vă
            exprimați acordul asupra folosirii cookie-urilor.
          </Typography>

          <Button
            color='secondary'
            onClick={handleAcceptConsent}
            size='medium'
            variant='contained'
          >
            Accept
          </Button>
        </Stack>
      )}
    </Stack>
  );
}
