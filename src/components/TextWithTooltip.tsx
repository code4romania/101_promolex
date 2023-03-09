import { ClickAwayListener, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';

export function TextWithTooltip({ text }: { text: string }) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true,
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={text}
      >
        <Typography onClick={handleTooltipOpen} noWrap>
          {text}
        </Typography>
      </Tooltip>
    </ClickAwayListener>
  );
}
