import { Http, rand_str } from './../../utils/index.js'

export const signup = Vue.component('signup', {
  data() {
    return {
      email: '',
      pass: ''
    }
  },
  methods: {
    signUp(e) {
      e.preventDefault()
      let email = this.email,
          pass = this.pass,
          confirm = rand_str(64)

      if(email.length && pass.length) {
        new Http({
          method: 'POST',
          url: '../backend/auth/signup.php',
          data: { email, pass, confirm },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(data => {
          if(data.status) {
            this.$router.push('/confirm')
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
      <input type="password" v-model="pass" placeholder="Password" />

      <input type="submit" value="Sign Up" class="btn" v-on:click="signUp" /> or
      <router-link exact to="/signin">Sign in</router-link>
    </form>
  </div>
  `
})