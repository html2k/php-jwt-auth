import { Http } from './../../utils/index.js'

export const recover = Vue.component('recover', {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    recover(e) {
      e.preventDefault()
      let email = this.email

      new Http({
        method: 'POST',
        url: '../backend/auth/recover.php',
        data: { email },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(data => {
        if(data.status) {
          console.log(data)
          // this.$router.push('/signin')
        } else {
          console.log(data.payload.message)
        }
      }).catch(err => {
        console.log(err)
      })

    }
  },
  template: `
    <div>
      <h2>Recover</h2>
      <p>If you've forgot your password, don't worry. You can recover your account.</p>

      <input type="text" v-model="email" placeholder="Email" />
      <button class="btn" v-on:click="recover">Recover</button>
    </div>
  `
})