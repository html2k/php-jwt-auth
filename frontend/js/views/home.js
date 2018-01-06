export const home = Vue.component('home', {
  template: `
  <div>
    <h2>home</h2>
    <router-link exact to="/signin">Sign in</router-link> or
    <router-link exact to="/signup">Sign up</router-link>
  </div>
  `
})