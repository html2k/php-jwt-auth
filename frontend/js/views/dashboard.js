import { signout } from './auth/signout.js'

export const dashboard = Vue.component('dashboard', {
  beforeMount() { if(!sessionStorage.getItem('token')) this.$router.push('/') },
  components: { signout },
  methods: {
    signOut(e) {
      e.preventDefault()
      sessionStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  template: `
  <div>
    <h2>Dashboard</h2>
    <signout />
  </div>
  `
})