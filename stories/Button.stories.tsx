import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from '../components/ui/Button'

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

export const Slim = Template.bind({})
Slim.args = {
  variant: 'slim'
}

export const Flat = Template.bind({})
Flat.args = {
  variant: 'flat'
}
