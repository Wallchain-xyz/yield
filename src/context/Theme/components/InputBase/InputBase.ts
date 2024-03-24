import { MUIRestyled } from '../MUIRestyled';

export const InputBaseRestyled: MUIRestyled<'MuiInputBase'> = {
  key: 'MuiInputBase',
  common: {
    styleOverrides: {
      root: wrapper => ({
        // probably default input will be this big, if we need smaller - we will use size=small
        fontSize: wrapper.theme.typography.h5.fontSize,
        fontWeight: wrapper.theme.typography.fontWeightBold,
      }),
      sizeSmall: wrapper => ({
        fontSize: wrapper.theme.typography.caption.fontSize,
      }),
      input: {
        ':focus': {
          background: 'initial',
        },
      },
    },
  },
};
