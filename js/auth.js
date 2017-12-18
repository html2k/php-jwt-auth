export { Auth }

var Auth = {

  SignIn: (user, pass) => {

    var xhr = new XMLHttpRequest()

    xhr.open('POST', 'server/signin.php')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhr.onload = function() {
      if(xhr.status === 200 && xhr.readyState === 4) {

        var response = JSON.parse(this.responseText)

        if(response.status) {
          sessionStorage.setItem('token', response.jwt.token)
          location.href = 'dashboard.html'
        } else {
          console.log(response.payload.message)
        }

      } else if(xhr.status !== 200) {
        console.log('error')
      }
    }

    xhr.send(encodeURI('user=' + user + '&pass=' + pass))
  },

  SignUp: (email, user, pass, repass) => {
    var xhr = new XMLHttpRequest()

    xhr.open('POST', 'server/signup.php')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhr.onload = function() {
      if(xhr.status === 200 && xhr.readyState === 4) {

        var response = JSON.parse(this.responseText)

        if(response.status) {
          sessionStorage.setItem('token', response.jwt.token)
          location.href = 'dashboard.html'
        } else {
          console.log(response.payload.message)
        }

      } else if(xhr.status !== 200) {
        console.log('error')
      }
    }

    xhr.send(encodeURI('email=' + email + '&user=' + user + '&pass=' + pass + '&repass=' + repass))
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