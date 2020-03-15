import Vue from 'vue'
import App from './app'
import GAuth from 'vue-google-oauth2'
import dotenv from 'dotenv'
dotenv.config()

const gauthOption = {
    clientId: '1037908903899-9fmou2dve6uch5jetfodvgail11bf6i5.apps.googleusercontent.com'
}

Vue.use(GAuth, gauthOption)
new Vue({
    render: view => view(App)
}).$mount('#app')