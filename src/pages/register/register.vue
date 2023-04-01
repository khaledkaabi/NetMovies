<template>
    <div class="row d-flex justify-content-center">
        <Alert v-if="existUser" :alert="alertText"/>
        <div class="col-md-6 col-10">
            <div class="container p-3 mt-4 shadow-lg p-3 mb-5 bg-white rounded">
            <h1>Sign up</h1>
            <form @submit.prevent="register">
                <div class="form-group mt-2">
                    <label for="last-name">Last Name:</label>
                    <input type="text" class="form-control" id="last-name" v-model="lastName" required>
                </div>
                <div class="form-group mt-2">
                    <label for="first-name">First Name:</label>
                    <input type="text" class="form-control" id="first-name" v-model="firstName" required>
                </div>
                <div class="form-group mt-2">
                    <label for="email">Email:</label>
                    <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="form-group mt-2">
                    <label for="password">Password:</label>
                    <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <div class="form-group mt-1">
                    <label for="confirm-password">Confirm Password:</label>
                    <input type="password" class="form-control" id="confirm-password" v-model="confirmPassword" required>
                    <div v-if="passwordsMatch === false" class="text-danger">Passwords do not match.</div>
                </div>
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-outline-info btn-sm mt-2" :disabled="passwordsMatch === false">Register</button>
                </div>
                <div class="p-2">
                    <a href="/login">Already have account</a>
                </div>
            </form>
        </div>
        </div>
    </div>
</template>
  
<script>

import Alert from '@/components/Alert/alert.vue'

export default {
    components: {
     Alert
  },
    data() {
        return {
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            confirmPassword: '',
            existUser:false,
            alertText:''
        }
    },
    computed: {
        passwordsMatch() {
            return this.password === this.confirmPassword;
        }
    },
    methods: {
        register() {
            let user = {
                lastName: this.lastName,
                firstName: this.firstName,
                email: this.email,
                password: this.password
            }
            let users = JSON.parse(localStorage.getItem("users")) || []
            const isExist = this.isUserExist(this.email, users);
            if (isExist) {
                this.existUser = true
                this.alertText = `User with email ${this.email} already exists.`
                } else {
                    users.push(user)
                    this.existUser = false
                    localStorage.setItem("users", JSON.stringify(users))
                    this.$router.push('/login')
                }
        },
        isUserExist(email, userList) {
            return userList.find(user => user.email === email) !== undefined;
}
    }
}
</script>

<style>
.container {
    border-radius: 4px;
}
</style>
  