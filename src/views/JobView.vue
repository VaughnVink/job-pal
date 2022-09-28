<template>
  <job-card :job-id="this.$route.params.id">
    <template slot="nav">
      <v-btn
        icon
        @click="$router.push('/')"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </template>
  </job-card>
</template>

<script>

export default {
  components: {
    JobCard: () => import('@/components/jobs/JobCard')
  }
}
</script>
