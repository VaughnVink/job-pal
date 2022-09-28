import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import JobsTable from '@/components/jobs/JobsTable.vue'

describe('JobsTable.vue', () => {
  it('Does not show a error class message', () => {
    const wrapper = shallowMount(JobsTable, {
      propsData: {
        jobs: [{
          _id: '12323123',
          clientId: '123123',
          identifier: 1,
          name: 'Test job.',
          status: 'scheduled'
        }]
      }
    })
    expect(wrapper.find('.error').exists()).to.equal(false)
  })
})
