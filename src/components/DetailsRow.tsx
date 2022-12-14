import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";

type DetailsRowProps = {
  label: string;
  details: string | string[];
};

export const DetailsRow = ({ label, details }: DetailsRowProps) => {
  const content = useMemo(
    () =>
      Array.isArray(details) ? (
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {details.map((detail, index) => (
            <Typography>
              {detail}
              {index < (details.length ?? 0) - 1 ? ", " : ""}
            </Typography>
          ))}
        </Stack>
      ) : (
        <Typography>{details}</Typography>
      ),
    [details]
  );

  return (
    <Stack direction="row" gap={1}>
      <Typography fontWeight={700} flexShrink={0}>
        {label}:
      </Typography>
      {content}
    </Stack>
  );
};
