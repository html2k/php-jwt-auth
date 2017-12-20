'use strict'

import { Http } from './utils/index.js'

export { Auth }

var Auth = {

  SignIn: (user, pass) => {

    new Http({
      method: 'POST',
      url: 'server/signin.php',
      data: { user, pass },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(data => {
      if(data.status) {
        sessionStorage.setItem('token', data.jwt.token)
        location.href = 'dashboard.html'
      } else {
        console.log(data.payload.message)
      }
    }).catch(err => {
      console.log(err)
    })

  },

  SignUp: (email, user, pass, repass) => {

    new Http({
      method: 'POST',
      url: 'server/signup.php',
      data: { email, user, pass, repass },
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).then(data => {
      if(data.status) {
        sessionStorage.setItem('token', data.jwt.token)
        location.href = 'dashboard.html'
      } else {
        console.log(data.payload.message)
      }
    }).catch(err => {
      console.log(err)
    })

  },

  SignOut: () => {
    sessionStorage.removeItem('token')
    location.href = 'signin.html'
  },

  checkToken: (page) => {
    var token = null,
        token = sessionStorage.getItem('token') // get token from sessionStorage

    if(page === 'signin' || page === 'signup') {
      if(token) location.href = 'dashboard.html'
    } else {
      if(!token) location.href = 'signin.html'
    }
  }

}