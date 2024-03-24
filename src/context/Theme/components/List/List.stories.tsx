import { ArrowForwardIosRounded } from '@mui/icons-material';
import BluetoothIcon from '@mui/icons-material/Bluetooth';
import WifiIcon from '@mui/icons-material/Wifi';
import { Divider, IconButton } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Switch from '@mui/material/Switch';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

function SwitchListSecondary() {
  const [checked, setChecked] = React.useState(['wifi']);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div
      style={{
        width: 360,
        whiteSpace: 'nowrap',
        border: '1px solid red',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <IconButton>
            <ArrowForwardIosRounded />
          </IconButton>
        </ListItem>
        <Divider variant="inset" />
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <IconButton>
            <ArrowForwardIosRounded />
          </IconButton>
        </ListItem>
      </List>
      <List subheader={<ListSubheader>Settings</ListSubheader>} sx={{ width: '100%' }}>
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <Switch
            edge="end"
            onChange={handleToggle('wifi')}
            checked={checked.indexOf('wifi') !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-wifi',
            }}
          />
        </ListItem>
        <Divider variant="inset" />
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <Switch
            edge="end"
            onChange={handleToggle('bluetooth')}
            checked={checked.indexOf('bluetooth') !== -1}
            inputProps={{
              'aria-labelledby': 'switch-list-label-bluetooth',
            }}
          />
        </ListItem>
      </List>
      <List sx={{ width: '100%' }}>
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
          <IconButton>
            <ArrowForwardIosRounded />
          </IconButton>
        </ListItem>
        <Divider variant="inset" />
        <ListItem>
          <ListItemIcon>
            <BluetoothIcon />
          </ListItemIcon>
          <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
          <IconButton>
            <ArrowForwardIosRounded />
          </IconButton>
        </ListItem>
      </List>
    </div>
  );
}

const meta: Meta<typeof SwitchListSecondary> = {
  component: SwitchListSecondary,
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
