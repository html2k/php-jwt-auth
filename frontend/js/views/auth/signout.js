export const signout = Vue.component('signout', {
  methods: {
    signOut(e) {
      e.preventDefault()
      sessionStorage.removeItem('token')
      this.$router.push('/')
    }
  },
  template: `
    <div>
      <button
        class="btn"
        v-on:click="signOut"
      >
      Sign out
      </button>
    </div>
  `
})