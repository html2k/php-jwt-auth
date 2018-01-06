import { Http } from './../../utils/index.js'

export const signup = Vue.component('signup', {
  data() {
    return {
      email: '',
      user: '',
      pass: ''
    }
  },
  methods: {
    signUp(e) {
      e.preventDefault()
      let email = this.email,
          user = this.user,
          pass = this.pass

      if(email.length && user.length && pass.length) {
        new Http({
          method: 'POST',
          url: '../backend/signup.php',
          data: { email, user, pass },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(data => {
          if(data.status) {
            this.$router.push('/')
          } else {
            console.log(data.payload.message)
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  template: `
  <div>
    <h2>Sign Up</h2>

    <form class="auth-form sign-up">
      <input type="email" v-model="email" placeholder="Email" />
      <input type="text" v-model="user" placeholder="Username" />
      <input type="password" v-model="pass" placeholder="Password" />

      <input type="submit" value="Sign Up" class="btn" v-on:click="signUp" /> or
      <router-link exact to="/signin">Sign in</router-link>
    </form>
  </div>
  `
})