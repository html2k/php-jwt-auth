'use strict'

import { nojs, ready, dime } from './utils/index.js'
import { Auth } from './auth.js'

const $ = dime
nojs() // Is JavaScript Enabled?

ready(() => {
  Auth.checkToken('signin')

  $('.sign-up').on('click', (e) => {
    location.href = 'signup.html'
  })

  $('.sign-in').on('submit', (e) => {
    e.preventDefault()
    var user = $('.user').val(),
        pass = $('.pass').val()

    Auth.SignIn(user, pass)
  })
})