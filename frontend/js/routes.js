import { home } from './views/home.js'
import { signup } from './views/signup.js'

export const routes =  [{
  path: '/',
  component: home,
}, {
  path: '/signup',
  component: signup,
}]