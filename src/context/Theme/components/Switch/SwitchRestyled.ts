import { MUIRestyled } from '../MUIRestyled';

export const SwitchRestyled: MUIRestyled<'MuiSwitch'> = {
  key: 'MuiSwitch',
  iOS: {
    styleOverrides: {
      root: ({ theme }) => ({
        width: theme.spacing(5.25),
        height: theme.spacing(3.25),
        padding: 0,
        marginRight: 0,
        '& .MuiSwitch-switchBase': {
          padding: 0,
          margin: theme.spacing(0.25),
          transitionDuration: theme.transitions.duration.complex,
          '&.Mui-checked': {
            transform: `translateX(${theme.spacing(2)})`,
            color: '#fff', // there is no white in palette, and I don't believe we ever would replace one white with another white, so no need to make separete variable for white color
            '& + .MuiSwitch-track': {
              backgroundColor: theme.palette.primary.main,
              opacity: 1,
              border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
              opacity: 0.5,
            },
          },
          '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: theme.palette.primary.main,
            borderWidth: theme.spacing(0.75),
            borderStyle: 'solid',
            borderColor: '#fff',
          },
          '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.primary.main,
          },
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.7,
          },
        },
        '& .MuiSwitch-thumb': {
          boxSizing: 'border-box',
          width: theme.spacing(2.75),
          height: theme.spacing(2.75),
        },
        '& .MuiSwitch-track': {
          borderRadius: theme.spacing(13 / 8),
          opacity: 1,
          transition: theme.transitions.create(['background-color'], {
            duration: theme.transitions.duration.standard,
            easing: theme.transitions.easing.easeOut,
          }),
        },
      }),
    },
  },
};
