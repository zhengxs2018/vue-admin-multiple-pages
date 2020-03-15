import { FunctionalComponentOptions } from 'vue'
import { shallowMount } from '@vue/test-utils'

const HelloWorld: FunctionalComponentOptions = {
  functional: true,
  props: {
    msg: String
  },
  render(h, { props }) {
    return h('span', props.msg)
  }
}

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
