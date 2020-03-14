import Vue from 'vue'
import App from './app'
import GAuth from 'vue-google-oauth2'
import dotenv from 'dotenv'
dotenv.config()

const gauthOption = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    scope: 'profile email',
    prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)
new Vue({
    render: view => view(App)
}).$mount('#app')