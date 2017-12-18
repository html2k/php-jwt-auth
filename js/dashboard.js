'use strict'

import { nojs, ready, dime } from './utils/index.js'
import { Auth } from './auth.js'

const $ = dime
nojs() // Is JavaScript Enabled?

ready(() => {
  Auth.checkToken()
  
  $('.sign-out').on('click', Auth.SignOut)

  var xhr = new XMLHttpRequest(),
      token = sessionStorage.getItem('token')

  xhr.open('GET', 'server/get_data.php')
  xhr.setRequestHeader('x-access-token', token)

  xhr.onload = function() {
    if(xhr.status === 200) {
      var response = JSON.parse(xhr.responseText),
          data = response.payload.data

      console.log(data)
    } else {
      console.log('Request failed.  Returned status of ' + xhr.status)
    }
  }

  xhr.send()
})