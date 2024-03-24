import { Components, Theme } from '@mui/material';

export interface MUIRestyled<T extends keyof Components<Theme>> {
  key: T;
  iOS?: Components<Theme>[T];
  Android?: Components<Theme>[T];
  common?: Components<Theme>[T];
}
