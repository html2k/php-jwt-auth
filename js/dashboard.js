'use strict'

import { nojs, ready, dime, Http } from './utils/index.js'
import { Auth } from './auth.js'

const $ = dime
nojs() // Is JavaScript Enabled?

ready(() => {
  var token = sessionStorage.getItem('token')

  Auth.checkToken()
  get()

  $('.sign-out').on('click', Auth.SignOut)

  $('.foo-btn').on('click', (e) => {
    e.preventDefault()
    let val = $('.foo').val()
    post(val)
  })

  function get() {
    new Http({
      method: 'GET',
      url: 'server/get.php',
      headers: { 'x-access-token': token }
    }).then(data => { 
      let response = data.payload.data
      $('.list li').remove()

      for(let i = 0; i < response.length; i++) {
        $('.list').append(`
          <li>
            <span data-id="${response[i].id}" contenteditable>${response[i].data}</span>
            <span class="del" data-id="${response[i].id}" contenteditable="false">&times;</span>
          </li>
        `)
      }

      $('.del').on('click', e => {
        del(e.target.dataset.id)
      })

      $('li').on('keyup', e => {
        if(e.keyCode === 13) {
          let id = e.target.dataset.id,
              val = e.target.innerText.replace(/(\r\n|\n|\r)/gm,'')
          
          update(id, val)
        }
      })

    }).catch(err => {
      console.log(err)
    })
  }

  function post(val) {
    new Http({
      method: 'POST',
      url: 'server/post.php',
      data: { data: val },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token
      }
    }).then(data => {
      get()
    }).catch(err => {
      console.log(err)
    })
  }

  function del(id) {
    new Http({
      method: 'POST',
      url: 'server/delete.php',
      data: { id },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token
      }
    }).then(data => {
      get()
    }).catch(err => {
      console.log(err)
    })
  }

  function update(id, val) {
    new Http({
      method: 'POST',
      url: 'server/update.php',
      data: { id, val },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token
      }
    }).then(data => {
      get()
    }).catch(err => {
      console.log(err)
    })
  }

})