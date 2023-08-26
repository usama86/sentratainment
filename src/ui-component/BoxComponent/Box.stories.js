import BoxComponent from './index'
export default {
  title: 'garana/BaseComponents/Box',
  component: BoxComponent,
  argTypes: {},
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => <BoxComponent {...args} />

// export const Base = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args

export const BoxTemplate = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BoxTemplate.args = {
  sx: {
    width: 100,
    height: 100,
    backgroundColor: 'primary.dark',
    '&:hover': {
      backgroundColor: 'primary.main',
      opacity: [0.9, 0.8, 0.7],
    },
  },
}
