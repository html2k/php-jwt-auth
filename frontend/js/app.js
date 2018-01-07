import { nojs, ready } from './utils/index.js'
import { topbar, wrapper } from './modules/index.js'
import { routes } from './routes.js'

nojs() // Is JavaScript Enabled?

ready(() => {
  Vue.use(VueRouter)

  new Vue({
    el: '#app',
    components: { topbar, wrapper },
    router: new VueRouter({ routes }),
    beforeMount() {
      sessionStorage.getItem('token') ?
        this.$router.push('/dashboard') :
        this.$router.push('/')
    },
    template: `
      <div class="app">
        <topbar />
        <wrapper />
      </div>
    `
  })
})