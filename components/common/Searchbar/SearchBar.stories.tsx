import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Searchbar, { Props } from './Searchbar'

export default {
  title: 'Common/Searchbar',
  component: Searchbar,
} as Meta

export const Basic: Story<Props> = (args) => <Searchbar {...args} />

const disabled = { control: { disable: true } }
Basic.argTypes = {
  onClick: disabled,
}
Basic.args = {}
