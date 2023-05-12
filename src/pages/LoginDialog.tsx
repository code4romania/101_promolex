import {
  Stack,
  Dialog,
  DialogContent,
  ButtonBase,
  DialogTitle,
  Button,
  DialogActions,
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
        Autentificați-vă pentru a continua
      </DialogTitle>
      <DialogContent>
        <Stack gap={3} pt={4}>
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
            <FcGoogle style={{ fontSize: 24 }} /> Continue with Google
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
            }}
          >
            <FaFacebook style={{ color: 'inherit', fontSize: 24 }} /> Continue
            with Facebook
          </ButtonBase>
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
