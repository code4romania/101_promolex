import EuroSymbolIcon from "@mui/icons-material/EuroSymbol";
import { Box, ButtonBase, Typography } from "@mui/material";

type DeputyIncomeCardProps = {
  bgcolor: string;
  label: string;
};

export const DeputyIncomeCard = ({ bgcolor, label }: DeputyIncomeCardProps) => {
  return (
    <ButtonBase
      sx={{
        bgcolor,
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
