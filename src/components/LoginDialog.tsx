import {
  Stack,
  Dialog,
  DialogContent,
  ButtonBase,
  DialogTitle,
  Button,
  DialogActions,
  Typography,
} from '@mui/material';
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useOnFacebookSignIn, useOnGoogleSignIn } from '../hooks';

type LoginDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function LoginDialog({ open, onClose }: LoginDialogProps) {
  const { isLoading: isLoadingGoogleUser, onGoogleSignIn } =
    useOnGoogleSignIn(onClose);

  const { isLoading: isLoadingFacebookUser, onFacebookSignIn } =
    useOnFacebookSignIn(onClose);

  const isLoading = isLoadingFacebookUser || isLoadingGoogleUser;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle position='relative' sx={{ textAlign: 'center' }}>
        Logare
      </DialogTitle>
      <DialogContent>
        <Stack alignItems='center' gap={3} pt={4} justifyContent='center'>
          <ButtonBase
            disabled={isLoading}
            onClick={onGoogleSignIn}
            sx={{
              border: '1px solid',
              borderColor: 'grey.400',
              borderRadius: 99,
              columnGap: 2,
              fontWeight: 'medium',
              px: 3,
              py: 1,
            }}
          >
            <FcGoogle style={{ fontSize: 24 }} />
            Conectați-vă prin Google
          </ButtonBase>
          <ButtonBase
            disabled={isLoading}
            onClick={onFacebookSignIn}
            sx={{
              backgroundColor: '#1877f2',
              border: '1px solid',
              borderColor: 'grey.400',
              borderRadius: 99,
              color: 'common.white',
              columnGap: 2,
              fontWeight: 'medium',
              px: 3,
              py: 1,
              display:'none'
            }}
          >
            <FaFacebook style={{ color: 'inherit', fontSize: 24 }} />
            Conectați-vă prin Facebook
          </ButtonBase>

          <Typography textAlign='center' maxWidth={200} variant='body2'>
            Continuând, sunteți de acord cu Termenii și condițiile
            101.promolex.md și confirmați că ați citit{' '}
            <Typography
              color='#780000'
              component='a'
              fontWeight={700}
              sx={{
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                  color: 'primary.main',
                },
              }}
              href={`${process.env.PUBLIC_URL}/terms.pdf`}
              target='_blank'
              variant='body2'
            >
              Politica de protecție a datelor cu caracter personal
            </Typography>
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} size='large' variant='text'>
          Închide
        </Button>
      </DialogActions>
    </Dialog>
  );
}
