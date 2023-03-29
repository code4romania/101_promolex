import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, ButtonBase, Typography } from '@mui/material';

type DeputyIncomeCardProps = {
  bgcolor: string;
  icon: IconProp;
  isActive?: boolean;
  label: string;
  onClick: () => void;
};

export function DeputyIncomeCard({
  bgcolor,
  icon,
  isActive,
  label,
  onClick,
}: DeputyIncomeCardProps) {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        bgcolor: isActive ? bgcolor : 'common.white',
        border: 1,
        borderColor: bgcolor,
        borderRadius: 2,
        color: isActive ? 'common.white' : bgcolor,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 6,
        minWidth: 130,
        width: 130,
        '&:hover': {
          bgcolor,
          color: 'common.white',
        },
      }}
    >
      <Box fontSize={96}>
        <FontAwesomeIcon icon={icon} />
      </Box>
      <Typography fontWeight={700} textAlign='center'>
        {label}
      </Typography>
    </ButtonBase>
  );
}

DeputyIncomeCard.defaultProps = {
  isActive: false,
};
