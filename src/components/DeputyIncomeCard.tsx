import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, ButtonBase, darken, Typography } from '@mui/material';

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
        bgcolor: isActive ? darken(bgcolor, 0.3) : bgcolor,
        borderRadius: 2,
        color: 'common.white',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 6,
        width: 150,
      }}
    >
      <Box fontSize={96}>
        <FontAwesomeIcon icon={icon} />
      </Box>
      <Typography
        fontWeight={700}
        textAlign='center'
        textTransform='capitalize'
      >
        {label}
      </Typography>
    </ButtonBase>
  );
}

DeputyIncomeCard.defaultProps = {
  isActive: false,
};
