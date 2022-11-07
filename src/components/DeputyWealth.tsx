import { Stack, Typography } from "@mui/material";
import { DeputyIncomeCard } from "./DeputyIncomeCard";

export const DeputyWealth = () => {
  return (
    <Stack gap={6}>
      <Typography fontWeight={700} variant="h4">
        Declarația de venituri
      </Typography>

      <Stack direction="row" gap={2} overflow="auto">
        <DeputyIncomeCard bgcolor="#88A9B5" label="Active financiare" />
        <DeputyIncomeCard bgcolor="#474757" label="Afaceri" />
        <DeputyIncomeCard bgcolor="#E9C699" label="Bunuri de valoare" />
        <DeputyIncomeCard bgcolor="#F6C3B4" label="Bunuri imobile" />
        <DeputyIncomeCard bgcolor="#EE7C83" label="Bunuri mobile" />
        <DeputyIncomeCard bgcolor="#88A9B5" label="Datorii" />
        <DeputyIncomeCard bgcolor="#E9C699" label="Interese personale" />
        <DeputyIncomeCard bgcolor="#EE7C83" label="Venit" />
      </Stack>
    </Stack>
  );
};
