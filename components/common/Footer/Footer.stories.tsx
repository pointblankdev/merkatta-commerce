import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import Footer, { Props } from './Footer'

export default {
  title: 'Common/Footer',
  component: Footer,
} as Meta

export const Basic: Story<Props> = (args) => <Footer {...args} />
Basic.args = {}
