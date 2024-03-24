import { StoryFn } from '@storybook/react';

import { CommonProviders } from './CommonStorybookProviders';

export const ProvidersDecorator = () => {
  return function StoryWrapper(Story: StoryFn) {
    return (
      <CommonProviders>
        <Story />
      </CommonProviders>
    );
  };
};
