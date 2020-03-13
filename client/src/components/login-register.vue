<template>
    <div id="loginRegister" class="container vw-100 vh-100 d-flex flex-column justify-content-around">
    <h1 class="text-center my-5">Kan-Ban-Zai</h1>
    <!-- LOGIN -->
    <div id="logDiv" class="container regLog text-center flexbox-regLog shadow-border" v-show="hasAccount">
    <h2 class="my-4">Log In</h2>
    <form class="container text-center" id="logForm" @submit.prevent="logSend()">
        <div class="form-group">
            <input class="form-control text-center mb-3" type="email" id="logEmail" placeholder="Email" v-model="logMail">
        </div>
        <div class="form-group">
            <input class="form-control text-center mb-3" type="password" id="logPassword" placeholder="Password" v-model="logPass">
        </div>
        <div class="form-group">
        <input class="form-control btn btn-primary mb-3" type="submit" id="logSubmit" value="Log In">
        <p class="text-center mb-3">Don't have an account?</p>
        <button class="form-control btn btn-outline-primary mb-3" id="goToRegister" @click.prevent="toReg()">Go to Register</button><br>
        <!-- <p class="text-center mb-3">Or</p> -->
        <!-- <div class="g-signin2 mb-5 border border-primary rounded" data-width="255" data-height="40" data-longtitle="true" data-onsuccess="onSignIn"></div> -->
        <!-- <g-signin-button @done="onUserLoggedIn"/> -->
        </div>
    </form>
    </div>
    <!-- END LOGIN -->

    <!-- REGISTER -->
    <div id="regDiv" class="container regLog text-center flexbox-regLog shadow-border" v-show="!hasAccount">
        <h2 class="my-4">Register</h2>
        <form class="container text-center" id="regForm" @submit.prevent="regSend()">
            <div class="form-group">
                <input class="form-control text-center mb-3" type="email" id="regEmail" placeholder="Email" v-model="regMail">
            </div>
            <div class="form-group">
                <input class="form-control text-center mb-3" type="password" id="regPassword" placeholder="Password" v-model="regPass1">
            </div>
            <div class="form-group">
                <input class="form-control text-center mb-3" type="password" id="regPasswordConfirm" placeholder="Confirm Password" v-model="regPass2">
            </div>
            <div class="form-group">
            <input class="form-control btn btn-primary mb-3" type="submit" id="regSubmit" value="Register">
            <p class="text-center mb-3">Already have an account?</p>
            <button class="form-control btn btn-outline-primary mb-3" id="goToLogin" @click.prevent="toLog()">Go to Login</button><br>
            </div>
        </form>
    </div>
    <!-- END REGISTER -->
    <p class="text-center my-5">&copy; 2020 Muhammad Ramadhan</p>
    </div>
</template>

<script>
// import { onSignIn, signOut } from '../script/google'
import axios from 'axios'
import Swal from 'sweetalert2'
import dotenv from 'dotenv'
dotenv.config()

export default {
    name: 'logReg',
    props: ['loginStatus'],
    data() {
        return {
            hasAccount: true,
            logMail: '',
            logPass: '',
            regMail: '',
            regPass1: '',
            regPass2: ''
        }
    },
    // mounted () {
    //     window.gapi.load('auth2', () => {
    //     const auth2 = window.gapi.auth2.init({
    //         client_id: '1042675119174-scbij1k97ugm68himh633ephensteqnt.apps.googleusercontent.com',
    //         cookiepolicy: 'single_host_origin'
    //     })
    //     auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
    //         this.$emit('done', googleUser)
    //         }, error => console.log(error))
    //     })
    // },
    methods: {
        toReg() {
            this.hasAccount = false
        },
        toLog() {
            this.hasAccount = true
        },
        logSend() {
            axios({
                method: 'POST',
                url: process.env.VUE_APP_BASE_URL + '/user/login',
                data: {
                    email: this.logMail,
                    password: this.logPass
                }
            })
            .then(result => {
                console.log('Login Success!')
                this.logMail = ''
                this.logPass = ''
                this.$emit('loginSuccess', result)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Login Success!',
                    showConfirmButton: false,
                    timer: 1000
                })
            })
            .catch(err => {
                console.log(err.response.data)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `${err.response.data.message}`,
                    showConfirmButton: false,
                    timer: 1000
                })
            })
        },
        regSend() {
            if (this.regPass1 !== this.regPass2) {
                this.regPass1 = ''
                this.regPass2 = ''
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: `Password didn't match Confirm Password!`,
                    showConfirmButton: true,
                })
            } else {
                axios({
                    method: 'POST',
                    url: process.env.VUE_APP_BASE_URL + '/user/register',
                    data: {
                        email: this.regMail,
                        password: this.regPass1
                }
                })
                .then(result => {
                    console.log('Register Success!')
                    // this.$emit('registerSuccess', result)
                    this.regMail = ''
                    this.regPass1 = ''
                    this.regPass2 = ''
                    this.logMail = result.data.email
                    this.toLog()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Register Success!<br>Please Log In.',
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
                .catch(err => {
                    console.log(err.response.data)
                    Swal.fire({
                        position: 'top-end',
                        icon: 'error',
                        title: `${err.response.data.message}`,
                        showConfirmButton: false,
                        timer: 1000
                    })
                })
            }
        }
    }
}
</script>