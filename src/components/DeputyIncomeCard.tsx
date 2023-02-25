import {
  Box,
  ButtonBase,
  darken,
  SvgIconProps,
  Typography,
} from '@mui/material';

type DeputyIncomeCardProps = {
  bgcolor: string;
  icon: (props: SvgIconProps) => JSX.Element;
  isActive?: boolean;
  label: string;
  onClick: () => void;
};

export function DeputyIncomeCard({
  bgcolor,
  icon: Icon,
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
        <Icon color='inherit' fontSize='inherit' />
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
