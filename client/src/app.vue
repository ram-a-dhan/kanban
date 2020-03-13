<template>
    <div id="app">
        <mainPage
            :loginStatus="loginStatus"
            @loginSuccess="loginSuccess"
            @logoutSuccess="logoutSuccess"
            v-if="loginStatus"
        ></mainPage>
        <logReg
            :loginStatus="loginStatus"
            @loginSuccess="loginSuccess"
            @logoutSuccess="logoutSuccess"
            v-else
        ></logReg>
    </div>
</template>

<script>
import Vue from 'vue'
// import axios from 'axios'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import logReg from './components/login-register'
import mainPage from './components/kanban-page'
import Swal from 'sweetalert2'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
export default {
    components: {
        logReg,
        mainPage
    },
    data() {
        return {
            loginStatus: false
        }
    },
    created() {
        this.checkLogin()
    },
    methods: {
        checkLogin() {
            this.loginStatus = localStorage.token ? true : false
        },
        loginSuccess(result) {
            localStorage.token = result.data.token
            this.checkLogin()
        },
        logoutSuccess(result) {
            delete localStorage.token
            this.checkLogin()
        }
    }
}
</script>