import { Http } from './../../utils/index.js'

export const confirm = Vue.component('confirm', {
  data() {
    return {
      hash: ''
    }
  },
  methods: {
    confirm(e) {
      e.preventDefault()
      let confirm = this.hash

      new Http({
        method: 'POST',
        url: '../backend/auth/confirm.php',
        data: { confirm },
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then(data => {
        if(data.status) {
          this.$router.push('/signin')
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
      <h2>Confirm</h2>
      <p>Please check your email account for a confirmation key</p>

      <input type="text" v-model="hash" placeholder="Confirmation key" />
      <button class="btn" v-on:click="confirm">Confirm</button>
    </div>
  `
})