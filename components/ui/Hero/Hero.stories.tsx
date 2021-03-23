import { Story, Meta } from '@storybook/react/types-6-0'

import Hero, { HeroProps } from './Hero'

export default {
  title: 'UI/Hero',
  component: Hero,
} as Meta

const Template: Story<HeroProps> = (args) => <Hero {...args} />

export const Basic = Template.bind({})
Basic.args = {
  headline: 'Big News!',
  description: 'Read all about it!',
}
