import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { Meta, StoryObj } from '@storybook/react';

import { ProvidersDecorator } from '@/storybook-utils/ProvidersDecorator';

import { ErrorScreen } from './ErrorScreen';

const meta: Meta<typeof ErrorScreen> = {
  title: 'UI Widgets/ErrorScreen',
  component: ErrorScreen,
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
      defaultViewport: 'iphone12',
    },
    layout: 'fullscreen',
  },
  decorators: [ProvidersDecorator()],
};

export default meta;

export const PlainPage: StoryObj<typeof meta> = {
  args: {
    error: new Error('An error occurred'),
    reset: () => {},
  },
};
