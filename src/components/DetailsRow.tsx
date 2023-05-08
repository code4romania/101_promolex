import { Stack, Typography } from '@mui/material';
import { uniqueId } from 'lodash';
import { ReactNode, useMemo } from 'react';

type DetailsRowProps = {
  label: string;
  details: ReactNode | ReactNode[];
};

export function DetailsRow({ label, details }: DetailsRowProps) {
  const content = useMemo(
    () =>
      Array.isArray(details) ? (
        <Stack direction='row' flexWrap='wrap' gap={1}>
          {details.map((detail, index) => (
            <Typography key={uniqueId()}>
              {detail}
              {index < (details.length ?? 0) - 1 ? ', ' : ''}
            </Typography>
          ))}
        </Stack>
      ) : (
        <Typography>{details}</Typography>
      ),
    [details],
  );

  return (
    <Stack direction='row' gap={1} flexWrap='wrap'>
      <Typography fontWeight={700} flexShrink={0}>
        {label}:
      </Typography>
      {content}
    </Stack>
  );
}
