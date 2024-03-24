import { MUIRestyled } from '../MUIRestyled';

export const ListItemRestyled: MUIRestyled<'MuiListItem'> = {
  key: 'MuiListItem',
  iOS: {
    styleOverrides: {
      root: ({ theme }) => ({
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
        '&>.MuiIconButton-root': {
          paddingRight: 0,
        },
      }),
    },
  },
};
