import { Components, Theme } from '@mui/material';
import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import mergeWith from 'lodash.mergewith';

import { InputRestyled } from '@/context/Theme/components/Input/Input';
import { TextFieldRestyled } from '@/context/Theme/components/TextField/TextField';

import { Platform } from '../types';

import { ButtonRestyled } from './Button/Button';
import { CardRestyled } from './Card/CardRestyled';
import { CardContentRestyled } from './CardContent/CardContent';
import { ContainerRestyled } from './Container/Container';
import { DividerRestyled } from './Divider/DividerRestyled';
import { IconButtonRestyled } from './IconButton/IconButtonRestyled';
import { InputBaseRestyled } from './InputBase/InputBase';
import { ListRestyled } from './List/ListRestyled';
import { ListItemRestyled } from './ListItem/ListItemRestyled';
import { ListItemIconRestyled } from './ListItemIcon/ListItemIconRestyled';
import { ListSubheaderRestyled } from './ListSubheader/ListSubheaderRestyled';
import { MUIRestyled } from './MUIRestyled';
import { SwitchRestyled } from './Switch/SwitchRestyled';

const components: MUIRestyled<keyof Components<Theme>>[] = [
  ListRestyled,
  ListItemRestyled,
  ListSubheaderRestyled,
  ListItemIconRestyled,
  SwitchRestyled,
  IconButtonRestyled,
  DividerRestyled,
  ContainerRestyled,
  CardRestyled,
  CardContentRestyled,
  InputBaseRestyled,
  InputRestyled,
  TextFieldRestyled,
  ButtonRestyled,
];

export function getRestyledComponents(platform: Platform) {
  const restyled = components.reduce((acc: Components<Theme>, tmpComponent) => {
    const component = cloneDeep(tmpComponent);
    const { key, common } = component;
    const platformSpecific = component[platform];

    if (!common && !platformSpecific) return acc;

    if (!common !== !platformSpecific) return { ...acc, [key]: common || platformSpecific };

    return {
      ...acc,
      [key]: mergeWith(common, platformSpecific, (objValue: unknown, srcValue: unknown) => {
        const objIsFunc = objValue instanceof Function;
        const srcIsFunc = srcValue instanceof Function;

        if (objIsFunc !== srcIsFunc) {
          return function mergeWithFunctuin(...args: unknown[]) {
            const first = objIsFunc ? objValue(...args) : objValue;
            const second = srcIsFunc ? srcValue(...args) : srcValue;

            return merge(first, second);
          };
        }
        if (objIsFunc && srcIsFunc) {
          return function mergeWithFunctuin(...args: unknown[]) {
            const objResult = objValue(...args);
            const srcResult = srcValue(...args);

            return merge(objResult, srcResult);
          };
        }
        return undefined;
      }),
    };
  }, {});

  return restyled;
}
