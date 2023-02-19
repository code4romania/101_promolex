import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Stack, useTheme, Collapse } from '@mui/material';
import { ReactNode, useState } from 'react';

const WATCHED_COLOR = '#835388';

type CommitteeDetailsProps = {
  details: ReactNode;
  watched?: boolean;
};

export function CommitteeSummary({ details, watched }: CommitteeDetailsProps) {
  const { palette, typography } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const expandedBgColor = watched ? WATCHED_COLOR : palette.secondary.main;
  const expandedColor = palette.common.white;
  const bgColor = watched ? palette.grey[100] : palette.common.white;
  const color = watched ? WATCHED_COLOR : palette.text.primary;

  return (
    <Stack gap={2}>
      <Stack
        bgcolor={expanded ? expandedBgColor : bgColor}
        border={watched || (expanded && !watched) ? 0 : 1}
        borderColor='grey.400'
        borderRadius={2}
        boxShadow={1}
        color={expanded ? expandedColor : color}
        direction='row'
        onClick={() => setExpanded(!expanded)}
        px={6}
        py={3}
        sx={{ cursor: 'pointer' }}
      >
        <Typography
          color='inherit'
          flexGrow={1}
          fontWeight={typography.fontWeightBold}
        >
          Comisia pentru afaceri europene
        </Typography>

        {expanded ? (
          <ExpandLessIcon color='inherit' />
        ) : (
          <ExpandMoreIcon color='inherit' />
        )}
      </Stack>

      <Collapse in={expanded} mountOnEnter unmountOnExit>
        {details}
      </Collapse>
    </Stack>
  );
}

CommitteeSummary.defaultProps = {
  watched: false,
};
