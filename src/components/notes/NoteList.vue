<template>
  <v-list>
    <div style="padding: 0 16px;">
      <v-textarea
        v-model="newNote"
        single-line
        rows="2"
        :placeholder="$t('screens.notes.creationPlaceholder')"
        hide-details
      />
      <v-card-actions>
        <v-spacer /><v-btn
          id="closeButton"
          color="primary"
          :loading="creatingNote"
          @click="createNote()"
        >
          {{ $t('screens.notes.create') }}
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
    <v-list-item
      v-for="(note, key) in notes"
      :key="key"
    >
      <v-list-item-content>
        <v-list-item-subtitle>
          {{ $moment(note.createdAt).format('L LTS') }} - <a @click="removeNote(note._id)">{{ $t('screens.notes.remove') }}</a>
        </v-list-item-subtitle>
        <v-list-item-title>
          {{ note.description }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  props: {
    jobId: { type: String, required: true }
  },
  data: () => ({
    newNote: '',
    notes: [],
    removingNote: false,
    loadingNotes: false,
    creatingNote: false
  }),
  mounted () {
    this.getNotes()
  },
  methods: {
    async removeNote (noteId) {
      this.removingNote = true
      try {
        await this.$api.service('notes').remove(noteId)
      } catch (error) {
        console.error(error)
        this.$toasted.global.error({
          message: this.$t('screens.notes.errors.remove')
        })
      }
      this.getNotes()
      this.removingNote = false
    },
    async createNote () {
      this.creatingNote = true
      try {
        this.notes = await this.$api.service('notes').create({ description: this.newNote, jobId: this.jobId })
        this.newNote = ''
      } catch (error) {
        console.error(error)
        this.$toasted.global.error({
          message: this.$t('screens.notes.errors.create')
        })
      }
      this.getNotes()
      this.creatingNote = false
    },
    async getNotes () {
      this.loadingNotes = true
      try {
        this.notes = await this.$api.service('notes').find({
          query: {
            jobId: this.jobId
          }
        })
      } catch (error) {
        console.error(error)
        this.$toasted.global.error({
          message: this.$t('screens.notes.errors.find')
        })
      }
      this.loadingNotes = false
    }
  }
}
</script>

<style>

</style>
