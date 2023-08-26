import TypographyComponent from './index'

export default {
  title: 'garana/BaseComponents/TypographyComponent',
  component: TypographyComponent,
  //   agrsTypes: { onClick: { action: 'clicked' } },
}

const Template = (args) => <TypographyComponent {...args} />

export const Typography = Template.bind({})

Typography.args = {
  children: <>Buy a property</>,
  variant: 'h4',
}
