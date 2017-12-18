'use strict'

import { nojs, ready, dime } from './utils/index.js'
import { Auth } from './auth.js'

const $ = dime
nojs() // Is JavaScript Enabled?

ready(() => {
  var xhr = new XMLHttpRequest(),
      token = sessionStorage.getItem('token')

  Auth.checkToken()
  
  $('.sign-out').on('click', Auth.SignOut)

  // Get data
  function get_data() {
    xhr.open('GET', 'server/get_data.php')
    xhr.setRequestHeader('x-access-token', token)

    xhr.onload = function() {
      if(xhr.status === 200) {
        var response = JSON.parse(xhr.responseText),
            data = response.payload.data

        $('.list li').remove()

        for(let i = 0; i < data.length; i++) {
          $('.list').append(`<li>${data[i].data}</li>`)
        }
      } else {
        console.log('Request failed.  Returned status of ' + xhr.status)
      }
    }

    xhr.send()
  }
  
  get_data()

  // Send data
  function send_data(data) {
    xhr.open('POST', 'server/send_data.php')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.setRequestHeader('x-access-token', token)

    xhr.onload = function() {
      if(xhr.status === 200 && xhr.readyState === 4) {

        var response = JSON.parse(this.responseText)

        if(response) {
          console.log(response)
          get_data()
        } else {
          console.log(response)
        }

      } else if(xhr.status !== 200) {
        console.log('error')
      }
    }

    xhr.send(encodeURI('data=' + data))
  }

  $('.foo-btn').on('click', (e) => {
    e.preventDefault()
    let val = $('.foo').val()
    // console.log(val)
    send_data(val)
  })

})