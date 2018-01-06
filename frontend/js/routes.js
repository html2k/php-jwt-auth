import { home } from './views/home.js'
import { dashboard } from './views/dashboard.js'
import { signup } from './views/auth/signup.js'
import { signin }  from './views/auth/signin.js'
import { recover } from './views/auth/recover.js'
import { confirm } from './views/auth/confirm.js'

export const routes =  [{
  path: '/',
  component: home
}, {
  path: '/dashboard',
  component: dashboard
}, {
  path: '/signup',
  component: signup
}, {
  path: '/signin',
  component: signin
}, {
  path: '/recover',
  component: recover
}, {
  path: '/confirm',
  component: confirm
}]