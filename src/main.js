import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import VueMoment from 'vue-moment'
import moment from 'moment'
import Api from './Api'
require('moment/locale/en-gb')
Vue.config.productionTip = false

// Base settings loaded in through env variables, see .env files for dev, prod etc..
const baseAppConfiguration = {
  locale: process.env.VUE_APP_I18N_LOCALE,
  app: process.env.VUE_APP_TITLE,
  icon: process.env.VUE_APP_ICON
}

const setup = async () => {
  // Having a seperate config.json file comes in handy for later built container-based configuration.
  let deploymentConfiguration
  try {
    deploymentConfiguration = await fetch('/config.json').then((response) => response.json())
  } catch (error) {
    console.error('Failed to load json config at /config.json')
    throw error
  }
  // Merge deployment-time config with base build-time config.
  Vue.prototype.$config = { ...baseAppConfiguration, ...deploymentConfiguration }
  console.log(Vue.prototype.$config)
  // Time formatting
  Vue.use(VueMoment, {
    moment
  })
  Vue.use(Toasted)

  // Toast messages
  Vue.toasted.register('error',
    (payload) => {
    // if there is no message passed show default message
      if (!payload.message) {
        return 'Oops.. Something Went Wrong..'
      }

      // if there is a message show it with the message
      return payload.message
    },
    {
      iconPack: 'mdi',
      type: 'error',
      icon: 'alert-circle',
      duration: 2000
    }
  )
  Vue.toasted.register('success',
    (payload) => {
      if (!payload.message) {
        throw new Error('Need message.')
      }
      return payload.message
    },
    {
      iconPack: 'mdi',
      type: 'success',
      icon: 'check',
      duration: 2000
    }
  )

  // i18n on route titles
  router.beforeEach((to, from, next) => {
    document.title = i18n.t('screens.' + to.name + '.title') + ' | ' + i18n.t('app.title')
    next()
  })

  // API
  Vue.prototype.$api = new Api()
  await Vue.prototype.$api.generateMockData()

  new Vue({
    router,
    vuetify,
    i18n,
    render: h => h(App)
  }).$mount('#app')
}
setup()
