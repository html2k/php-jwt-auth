import { logo, navigation } from './../components/index.js'

export const topbar = Vue.component('topbar', {
  components: {
    logo,
    navigation
  },
  template: `
  <div class="topbar">
    <logo />
    <navigation />
  </div>`
})
