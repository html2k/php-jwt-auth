import { signout } from './auth/signout.js'

export const dashboard = Vue.component('dashboard', {
  components: {
    signout
  },
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