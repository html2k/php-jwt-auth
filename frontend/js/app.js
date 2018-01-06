import { topbar, wrapper } from './modules/index.js'

export const app = Vue.component('app', {
  components: {
    topbar,
    wrapper
  },
  template: `
  <div class="app">
    <topbar />
    <wrapper />
  </div>`
})
