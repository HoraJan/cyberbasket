import { useTheme } from '@mui/material';
import { createMakeAndWithStyles } from 'tss-react';

export const {
  makeStyles,
  useStyles,
} = createMakeAndWithStyles({ useTheme });
