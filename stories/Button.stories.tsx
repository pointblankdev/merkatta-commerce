import { Story, Meta } from '@storybook/react/types-6-0'

import Button, { ButtonProps } from '../components/ui/Button'

export default {
  title: 'UI/Button',
  component: Button
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>

const disabled = { control: { disable: true } }

export const Slim = Template.bind({})
Slim.argTypes = {
  className: disabled,
  Component: disabled,
  onClick: disabled
}
Slim.args = {
  variant: 'slim'
}

export const Flat = Template.bind({})
Flat.argTypes = {
  className: disabled,
  Component: disabled,
  onClick: disabled
}
Flat.args = {
  variant: 'flat'
}
