import { shallowMount } from '@vue/test-utils'
import { Home } from '@/views/Home'

describe('Home.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    // as any : https://github.com/vuejs/vue-test-utils-next/issues/194#issuecomment-694167869
    const wrapper = shallowMount(Home as any, {
      props: { msg },
    })

    expect(wrapper.text())
      .toMatch(msg)
  })
})
