import { Story, Meta } from '@storybook/react/types-6-0'

import Hero, { HeroProps } from '../components/ui/Hero'

export default {
  title: 'Example/Hero',
  component: Hero,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<HeroProps> = (args) => <Hero {...args} />

export const Basic = Template.bind({})
Basic.args = {
  backgroundColor: 'RGBA(38,30,90,1)',
  headline: 'Big News!',
  description: 'Read all about it!'
}
