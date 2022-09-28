export default {
  props: {
    clientId: { type: String, required: true }
  },
  data: () => ({
    client: null,
    clientLoading: true
  }),
  mounted () {
    this.getClient()
  },
  methods: {
    async getClient () {
      this.clientLoading = true
      try {
        const response = await this.$api.service('clients').get(this.clientId)
        this.client = response
        this.client.initials = this.client.name.split(' ').map((n) => n[0]).join('')
      } catch (error) {
        console.error(error)
        this.$toasted.global.error({
          message: 'Oops.. could not get client info.'
        })
      }
      this.clientLoading = false
    }
  }
}
