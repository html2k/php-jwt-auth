import { routes } from './routes.js'
import { app } from './app.js'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  el: '#app',
  components: { app },
  router: new VueRouter({ routes }),
  data() { return { auth: false } },
  mounted() {
    if(sessionStorage.getItem('token')) {
      this.$router.push('/dashboard')
      this.$data.auth = true
    } else {
      this.$router.push('/')
    }
  },
  updated() {
    console.log(this.$data.auth)
  },
  template: '<app />'
})