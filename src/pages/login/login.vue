<template>
    <div class="row d-flex justify-content-center mt-auto align-items-center">
        <Alert v-if="!isExistUser" :alert="alert"/>
        <div class="col-md-6 col-10">
            <div class="container ml-5 p-3 mt-5 shadow-lg p-3 mb-5 bg-white rounded">
                <h1>Sign in</h1>
                <form @submit.prevent="login">
                    <div class="form-group mt-2">
                        <label for="email">Email:</label>
                        <input type="email" class="form-control" id="email" v-model="email" required>
                    </div>
                    <div class="form-group mt-2">
                        <label for="password">Password:</label>
                        <input type="password" class="form-control" id="password" v-model="password" required>
                    </div>
                    <div class="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" class="btn btn-outline-info btn-sm mt-2">Login</button>
                    </div>
                    <div class="p-2">
                        <a href="/register">Create account</a>
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
            email: '',
            password: '',
            isExistUser: true,
            alert: ''
        }
    },
    methods: {
        login() {
            let users = JSON.parse(localStorage.getItem("users"))
            let user = this.getUserByEmail(this.email,users)
            if (user) {
                if (user.email === this.email && user.password === this.password) {
                    localStorage.setItem("user", JSON.stringify(user))
                    this.$router.push('/movies')
                } else {
                    this.isExistUser = false
                    this.alert = "Wrong data, please retry"
                }
            } else {
                this.isExistUser = false
                this.alert = "User doesn't exist, click create account to start with NetMovies"
            }
        },
        getUserByEmail(email, userList) {
         return userList.find(user => user.email === email);
}
    }
}
</script>

<style>
.container {
    border-radius: 4px;
}
</style>
  