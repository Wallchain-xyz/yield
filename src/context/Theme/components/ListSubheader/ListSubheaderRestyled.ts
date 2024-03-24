import { MUIRestyled } from '../MUIRestyled';

export const ListSubheaderRestyled: MUIRestyled<'MuiListSubheader'> = {
  key: 'MuiListSubheader',
  common: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.secondary,
        borderRadius: theme.spacing(1.5),
      }),
    },
  },
  Android: {
    styleOverrides: {
      root: {
        zIndex: 2,
      },
    },
  },
  iOS: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: 'unset',
        textTransform: 'uppercase',
        lineHeight: theme.spacing(4),
        padding: 0,
        opacity: 0.75,
        fontSize: theme.spacing(13 / 8),
      }),
    },
  },
};
