import Vue from 'vue'
import App from './app'
import GAuth from 'vue-google-oauth2'
import dotenv from 'dotenv'
dotenv.config()

const gauthOption = {
    clientId: '530807465865-mbfk02u5k4m9o2988r14hte7v74kss0s.apps.googleusercontent.com'
}

Vue.use(GAuth, gauthOption)
new Vue({
    render: view => view(App)
}).$mount('#app')