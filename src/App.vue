<template>
  <v-app>
    <v-app-bar
      :elevation="0"
      style="flex-grow: 0;"
      color="white"
    >
      <v-toolbar-title id="top-title">
        <v-btn
          large
          text
          style="padding-left: 8px;"
          @click="homeButtonClick()"
        >
          <v-avatar
            dark
            size="32"
            :style="dynamicGradient + ' margin-right: 6px;'
            "
          >
            <v-icon color="white">
              {{ $config.icon }}
            </v-icon>
          </v-avatar>
          <span
            id="app-title"
            style="font-size: 16px"
          >
            {{ $config.app }}
          </span>
        </v-btn>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  computed: {
    dynamicGradient () {
      return 'background: rgb(160,10,215); background: linear-gradient(127deg, ' + this.$vuetify.theme.themes.light.primary + ' 0%, ' + this.$vuetify.theme.themes.light.secondary + ' 100%);'
    }
  },
  methods: {
    homeButtonClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style>
#top-title {
  font-weight: 500;
  cursor: pointer;
}
.toasted-container {
  font-family: "Roboto";
}
</style>
