import Vue from 'vue'
import App from './app'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
new Vue({
    render: view => view(App)
}).$mount('#app')