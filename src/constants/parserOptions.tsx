import { Typography } from '@mui/material';
import { HTMLReactParserOptions, Element, domToReact } from 'html-react-parser';

export const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.name === 'p') {
      return (
        <Typography textAlign='justify'>
          {domToReact(domNode.children)}
        </Typography>
      );
    }

    return domNode;
  },
};
