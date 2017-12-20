'use strict'

import { nojs, ready, dime, Http } from './utils/index.js'
import { Auth } from './auth.js'

const $ = dime
nojs() // Is JavaScript Enabled?

ready(() => {
  var token = sessionStorage.getItem('token')

  Auth.checkToken()
  get_data()

  $('.sign-out').on('click', Auth.SignOut)

  $('.foo-btn').on('click', (e) => {
    e.preventDefault()
    let val = $('.foo').val()
    send_data(val)
  })

  // Get data
  function get_data() {

    new Http({
      method: 'GET',
      url: 'server/get_data.php',
      headers: {
        'x-access-token': token
      }
    }).then(data => { 
      let response = data.payload.data
      $('.list li').remove()

      for(let i = 0; i < response.length; i++) {
        $('.list').append(`<li>${response[i].data}</li>`)
      }
    }).catch(err => {
      console.log(err)
    })
    
  }

  // Send data
  function send_data(val) {

    new Http({
      method: 'POST',
      url: 'server/send_data.php',
      data: {
        data: val,
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token
      }
    }).then(data => {
      console.log(data)
    }).catch(err => {
      console.log(err)
    })
    
  }

})