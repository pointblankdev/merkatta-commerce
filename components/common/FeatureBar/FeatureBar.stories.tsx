import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import FeatureBar, { FeatureBarProps } from './FeatureBar'

export default {
  title: 'Common/FeatureBar',
  component: FeatureBar,
} as Meta

export const Basic: Story<FeatureBarProps> = (args) => <FeatureBar {...args} />

const disabled = { control: { disable: true } }
Basic.argTypes = {
  onClick: disabled,
}
Basic.args = {
  title: "I'm a title",
  description: "I'm a description",
}
