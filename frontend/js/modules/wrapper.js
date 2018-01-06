export const wrapper = Vue.component('wrapper', {
  template: `
  <div class="main">
    <transition name="router" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>`
})
