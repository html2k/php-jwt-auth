'use strict'

import { nojs, ready, dime } from './utils/index.js'
import { Auth } from './auth.js'

const $ = dime
nojs() // Is JavaScript Enabled?

ready(() => {
  Auth.checkToken('signup')

  $('.sign-in').on('click', (e) => {
    location.href = 'index.html'
  })

  $('.sign-up').on('submit', (e) => {
    e.preventDefault()
    var email = $('.email').val(),
        user = $('.user').val(),
        pass = $('.pass').val(),
        repass = $('.re-pass').val()

    Auth.SignUp(email, user, pass, repass)
  })
})