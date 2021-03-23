import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Avatar, { Props } from './Avatar'

export default {
  title: 'Common/Avatar',
  component: Avatar,
} as Meta

export const Basic: Story<Props> = (args) => <Avatar {...args} />

const disabled = { control: { disable: true } }
Basic.argTypes = {
  onClick: disabled,
}
Basic.args = {}
