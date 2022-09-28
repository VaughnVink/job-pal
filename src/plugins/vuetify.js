import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#5360c8',
        secondary: '#480096',
        accent: '#3f51b5'
      }
    }
  }
})
