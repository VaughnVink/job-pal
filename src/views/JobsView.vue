<template>
  <jobs-table :jobs="jobs" />
</template>

<script>

export default {
  components: {
    JobsTable: () => import('@/components/jobs/JobsTable')
  },
  data: () => ({
    jobs: [],
    loadingJobs: false
  }),
  mounted () {
    this.getJobs()
  },
  methods: {
    async getJobs () {
      this.loadingJobs = true
      try {
        this.jobs = await this.$api.service('jobs').find()
      } catch (error) {
        console.error(error)
        this.$toasted.global.error({
          message: 'Oops.. could not load jobs.'
        })
      }
      this.loadingJobs = false
    }
  }
}
</script>
