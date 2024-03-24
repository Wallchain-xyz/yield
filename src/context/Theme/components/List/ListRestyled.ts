import { MUIRestyled } from '../MUIRestyled';

export const ListRestyled: MUIRestyled<'MuiList'> = {
  key: 'MuiList',
  common: {
    styleOverrides: {
      root: ({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
      }),
    },
  },
};
