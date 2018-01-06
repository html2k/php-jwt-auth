export const signout = Vue.component('signout', {
  methods: {
    signOut(e) {
      e.preventDefault()
      sessionStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  template: `<button v-on:click="signOut">Sign out</button>`
})