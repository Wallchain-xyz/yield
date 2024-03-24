import { MUIRestyled } from '../MUIRestyled';

export const DividerRestyled: MUIRestyled<'MuiDivider'> = {
  key: 'MuiDivider',
  common: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        opacity: 0.5,
      }),
    },
  },
  iOS: {
    styleOverrides: {
      root: ({ theme }) => ({
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
      }),
    },
  },
};
