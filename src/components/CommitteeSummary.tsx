import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Stack, useTheme, Collapse } from '@mui/material';
import { ReactNode, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const WATCHED_COLOR = '#835388';

type CommitteeDetailsProps = {
  children: ReactNode;
  name: string;
  watched?: boolean;
};

export function CommitteeSummary({
  children,
  name,
  watched,
}: CommitteeDetailsProps) {
  const { palette, typography } = useTheme();
  const [params] = useSearchParams();
  const [expanded, setExpanded] = useState(params.get('committee') === name);
  const containerRef = useRef<HTMLDivElement>();

  const expandedBgColor = watched ? WATCHED_COLOR : palette.secondary.main;
  const expandedColor = palette.common.white;
  const bgColor = watched ? palette.grey[100] : palette.common.white;
  const color = watched ? WATCHED_COLOR : palette.text.primary;

  return (
    <Stack gap={2} ref={containerRef}>
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
          {name}
        </Typography>

        {expanded ? (
          <ExpandLessIcon color='inherit' />
        ) : (
          <ExpandMoreIcon color='inherit' />
        )}
      </Stack>

      <Collapse
        in={expanded}
        mountOnEnter
        unmountOnExit
        onEnter={() =>
          containerRef?.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          })
        }
      >
        {children}
      </Collapse>
    </Stack>
  );
}

CommitteeSummary.defaultProps = {
  watched: false,
};
