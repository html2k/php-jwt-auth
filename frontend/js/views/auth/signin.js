import { Http } from './../../utils/index.js'

export const signin = Vue.component('signin', {
  data() {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    signIn(e) {
      e.preventDefault()
      let that = this,
          user = this.user,
          pass = this.pass

      if(user.length && pass.length) {
        new Http({
          method: 'POST',
          url: '../backend/signin.php',
          data: { user, pass },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(data => {
          if(data.status) {
            sessionStorage.setItem('token', data.jwt.token)
            this.$router.push('/dashboard')
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
    <h2>Sign In</h2>
    
    <form class="auth-form sign-in">
      <input type="text" v-model="user" />
      <input type="password" v-model="pass" />

      <input type="submit" value="Sign In" class="btn" v-on:click="signIn" /> or 
      <router-link exact to="/recover">Recover</router-link>
    </form>
  </div>`
})