<template>
  <v-data-table
    class="data-table-flex"
    :headers="headers"
    :items="jobs"
    :items-per-page.sync="itemsPerPage"
    :loading="loading"
    :footer-props="footerProps"
    style="cursor: pointer;"
    @click:row="goToItem"
  >
    <template v-slot:[`item.clientId`]="{ item }">
      <client-avatar :client-id="item.clientId" />
    </template>
    <template v-slot:[`item.status`]="{ item }">
      <v-chip>
        {{ $t('screens.job.statuses.' + item.status) }}
      </v-chip>
    </template>
    <template v-slot:[`item.identifier`]="{ item }">
      <span style="text-transform: uppercase;">{{ $t('screens.job.reference') + '-' + item.identifier }}</span>
    </template>
    <template v-slot:[`item.createdAt`]="{ item }">
      {{ $moment(item.createdAt).format('L LTS') }}
    </template>
  </v-data-table>
</template>

<script>
export default {
  components: {
    ClientAvatar: () => import('@/components/clients/ClientAvatar')
  },
  props: {
    jobs: { type: Array, default: () => [] },
    loading: { type: Boolean, default: false }
  },
  data: () => ({
    footerProps: {
      'items-per-page-options': [10, 25, 50]
    },
    itemsPerPage: 10
  }),
  computed: {
    headers () {
      return [
        {
          width: '100',
          text: this.$t('screens.job.jobNumber'),
          value: 'identifier'
        },
        {
          width: '100',
          text: this.$t('screens.client.reference'),
          value: 'clientId'
        },
        {
          width: '200',
          text: this.$t('screens.job.status'),
          align: 'start',
          value: 'status'
        },
        {
          text: this.$t('screens.job.name'),
          value: 'name'
        },
        {
          text: this.$t('screens.job.createdAt'),
          value: 'createdAt'
        }
      ]
    }
  },
  methods: {
    goToItem (item) {
      this.$router.push('/jobs/' + item._id)
    }
  }
}
</script>

<style>

</style>
