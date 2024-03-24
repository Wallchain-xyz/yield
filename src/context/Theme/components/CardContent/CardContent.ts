import { MUIRestyled } from '../MUIRestyled';

export const CardContentRestyled: MUIRestyled<'MuiCardContent'> = {
  key: 'MuiCardContent',
  common: {
    styleOverrides: {
      root: wrapper => ({
        padding: wrapper.theme.spacing(1),
        '&:last-child': {
          paddingBottom: wrapper.theme.spacing(1),
        },
      }),
    },
  },
};
