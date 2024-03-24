import { MUIRestyled } from '../MUIRestyled';

export const ListItemIconRestyled: MUIRestyled<'MuiListItemIcon'> = {
  key: 'MuiListItemIcon',
  Android: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.primary,
      }),
    },
  },
  iOS: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        height: theme.spacing(3.75),
        width: theme.spacing(3.75),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: theme.spacing(6 / 8),
        minWidth: 'auto',
        marginRight: theme.spacing(2),
        '&>svg': {
          width: theme.spacing(2.5),
          height: theme.spacing(2.5),
        },
      }),
    },
  },
};
