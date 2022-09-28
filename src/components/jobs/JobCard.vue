<template>
  <v-card v-if="job">
    <v-card-title>{{ job.name }}<v-spacer /><slot name="nav" /></v-card-title>
    <v-card-subtitle>
      <span style="text-transform: uppercase;">{{ $t('screens.job.reference') + '-' + job.identifier }}</span> - {{ $moment(job.createdAt).format('L LTS') }}
    </v-card-subtitle>
    <v-row no-gutters>
      <v-col
        cols="12"
      >
        <v-card-subtitle style="padding-bottom: 0px;">
          <h4>{{ $t('screens.job.status') }}</h4>
        </v-card-subtitle>
        <div style="margin-left: 15px; padding-bottom: 10px; max-width: 200px">
          <v-select
            v-model="job.status"
            single-line
            :loading="loadingStatus"
            :items="statuses"
            hide-details
            @change="updateStatus()"
          >
            <template v-slot:[`selection`]="{ item }">
              {{ $t('screens.job.statuses.' + item) }}
            </template>
            <template v-slot:[`item`]="{ item }">
              {{ $t('screens.job.statuses.' + item) }}
            </template>
          </v-select>
        </div>
      </v-col>
      <v-col
        md="9"
        cols="12"
      >
        <v-card-subtitle><h4>{{ $t('screens.job.notes') }}</h4></v-card-subtitle>
        <note-list
          style="margin-left: 25px;"
          :elevation="0"
          :job-id="job._id"
        />
      </v-col>
      <v-col
        md="3"
        cols="12"
      >
        <v-card-subtitle><h4>{{ $t('screens.client.reference') }}</h4></v-card-subtitle>
        <client-card
          :elevation="0"
          :client-id="job.clientId"
        />
      </v-col>
    </v-row>
  </v-card>

  <v-skeleton-loader
    v-else
    type="card"
  />
</template>

<script>
export default {
  components: {
    ClientCard: () => import('@/components/clients/ClientCard'),
    NoteList: () => import('@/components/notes/NoteList')
  },
  props: {
    jobId: { type: String, required: true }
  },
  data: () => ({
    job: null,
    loadingJob: false,
    loadingStatus: false,
    statuses: ['scheduled', 'active', 'invoicing', 'to priced', 'completed']
  }),
  mounted () {
    this.getJob()
  },
  methods: {
    async updateStatus () {
      this.loadingJob = true
      try {
        this.job = await this.$api.service('jobs').update(this.jobId, this.job)
      } catch (error) {
        console.error(error)
        this.$toasted.global.error({
          message: this.$t('screens.job.errors.update')
        })
        this.$router.push('/')
      }
      this.loadingJob = false
    },
    async getJob () {
      this.loadingJob = true
      try {
        this.job = await this.$api.service('jobs').get(this.jobId)
      } catch (error) {
        console.error(error)
        this.$toasted.global.error({
          message: this.$t('screens.job.errors.get')
        })
        this.$router.push('/')
      }
      this.loadingJob = false
    }
  }
}
</script>

<style>

</style>
