import { routes } from './routes.js'
import { app } from './app.js'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
  el: '#app',
  components: { app },
  router: new VueRouter({ routes }),
  template: '<app />'
})