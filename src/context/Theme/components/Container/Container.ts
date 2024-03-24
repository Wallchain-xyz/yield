import { MUIRestyled } from '../MUIRestyled';

export const ContainerRestyled: MUIRestyled<'MuiContainer'> = {
  key: 'MuiContainer',
  common: {
    styleOverrides: {
      root: wrapper => ({
        padding: wrapper.theme.spacing(2),
      }),
    },
  },
};
