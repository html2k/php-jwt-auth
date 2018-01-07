import { Http } from './../utils/index.js'

export const profile = Vue.component('profile', {
  beforeMount() { if(!sessionStorage.getItem('token')) this.$router.push('/') },
  data() {
    return {
      email: 'john@doe.com'
    }
  },
  template: `
    <div>
      <h2>profile</h2>
      <p>Your email is: {{ email }}.</p>
      
      <input type="text" v-model="email" />
    </div>
  `
})