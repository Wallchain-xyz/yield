import { MUIRestyled } from '../MUIRestyled';

export const ButtonRestyled: MUIRestyled<'MuiButton'> = {
  key: 'MuiButton',
  common: {
    styleOverrides: {
      root: {
        boxShadow: 'none',
        ':hover': {
          boxShadow: 'none',
        },
      },
    },
  },
};
