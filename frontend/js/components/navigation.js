export const navigation = Vue.component('navigation', {
  template: `
  <ul>
    <li>
      <router-link exact to="/">Home</router-link>
    </li>
    <li>
      <router-link exact to="/signup">Sign up</router-link>
    </li>
  </ul>`
})