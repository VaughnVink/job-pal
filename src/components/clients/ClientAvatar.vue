<template>
  <v-tooltip
    v-if="!clientLoading"
    bottom
  >
    <template v-slot:activator="{ on, attrs }">
      <v-avatar
        color="primary"
        size="35"
        v-bind="attrs"
        v-on="on"
      >
        <span
          v-if="client"
          class="white--text text-h7"
        >{{ client.initials }}</span>
      </v-avatar>
    </template>
    <span>
      <b>{{ client.name }}</b><br>
      {{ client.address }}<br>
      {{ client.email }}<br>
      {{ client.phoneNumber }}
    </span>
  </v-tooltip>

  <v-skeleton-loader
    v-else
    type="avatar"
  />
</template>

<script>
import Client from './Client'
export default {
  mixins: [Client]
}
</script>

<style>

</style>
