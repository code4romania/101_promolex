import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import { Box, ButtonBase, darken, Typography } from "@mui/material";

type DeputyIncomeCardProps = {
  bgcolor: string;
  isActive?: boolean;
  label: string;
  onClick: () => void;
};

export const DeputyIncomeCard = ({
  bgcolor,
  isActive,
  label,
  onClick,
}: DeputyIncomeCardProps) => {
  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        bgcolor: isActive ? darken(bgcolor, 0.3) : bgcolor,
        borderRadius: 2,
        color: "common.white",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 6,
        width: 150,
      }}
    >
      <Box fontSize={96}>
        <EuroSymbolIcon color="inherit" fontSize="inherit" />
      </Box>
      <Typography fontWeight={700} textAlign="center">
        {label}
      </Typography>
    </ButtonBase>
  );
};
