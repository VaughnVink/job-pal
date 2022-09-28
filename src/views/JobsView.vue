<template>
  <jobs-table
    id="jobs-table"
    :jobs="jobs"
  />
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
          message: this.$t('screens.jobs.errors.find')
        })
      }
      this.loadingJobs = false
    }
  }
}
</script>
