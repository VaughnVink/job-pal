<template>
  <v-card
    v-if="client"
    :elevation="elevation"
  >
    <v-card-subtitle>
      <v-avatar
        style="margin-left: 12px; margin-right: 10px;"
        color="primary"
        size="35"
      >
        <span
          v-if="client"
          class="white--text text-h7"
        >{{ client.initials }}</span>
      </v-avatar>
      {{ client.name }}
    </v-card-subtitle>
    <v-card-text>
      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            {{ client.address }}
          </v-list-item-content>
        </v-list-item>
        <v-list-item><a :href="'mailto:' + client.email">{{ client.email }}</a></v-list-item>
        <v-list-item>{{ client.phoneNumber }}</v-list-item>
      </v-list>
    </v-card-text>
  </v-card>

  <v-skeleton-loader
    v-else
    type="card"
  />
</template>

<script>
import Client from './Client'
export default {
  mixins: [Client],
  props: {
    elevation: { type: Number, default: 1 }
  }
}
</script>

<style>

</style>
