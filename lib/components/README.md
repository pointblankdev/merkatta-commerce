# Components

Use Storybook to build small atomic components and complex pages in your web application. If it's a UI, you can build it with Storybook.

## What's a Story?

A story captures the rendered state of a UI component. Developers write multiple stories per component that describe all the “interesting” states a component can support.

The CLI created example components that demonstrate the types of components you can build with Storybook: Button, Header, and Page.

Each example component has a set of stories that show the states it supports. You can browse the stories in the UI and see the code behind them in files that end with .stories.js or .stories.ts. The stories are written in Component Story Format (CSF)--an ES6 modules-based standard--for writing component examples.

Let’s start with the Button component. A story is a function that describes how to render the component in question. Here’s how to render Button in the “primary” state and export a story called Primary.
