import { MUIRestyled } from '../MUIRestyled';

export const IconButtonRestyled: MUIRestyled<'MuiIconButton'> = {
  key: 'MuiIconButton',
  common: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
    },
  },
  iOS: {
    styleOverrides: {
      root: ({ theme }) => ({
        '&>svg': {
          height: theme.spacing(2.5),
          width: theme.spacing(2.5),
        },
      }),
    },
    defaultProps: {
      disableRipple: true,
    },
  },
};
