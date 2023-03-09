import CloseIcon from '@mui/icons-material/Close';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import { PropsWithChildren } from 'react';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type DetailsDialogProps = {
  handleClose: () => void;
  open: boolean;
};

export function DetailsDialog({
  children,
  handleClose,
  open,
}: PropsWithChildren<DetailsDialogProps>) {
  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      fullWidth
      PaperProps={{ sx: { m: { xs: 0 }, width: { xs: 1 } } }}
    >
      <DialogTitle
        sx={{
          alignItems: 'center',
          display: 'flex',
          m: 0,
          p: 2,
          minHeight: 65,
        }}
      >
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
            ml: 'auto',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </BootstrapDialog>
  );
}
