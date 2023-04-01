<template>
    <div class="row d-flex justify-content-center mt-auto align-items-center">
        <div v-if="!isExistUser" class="alert alert-danger" role="alert">
            {{ alert }}
        </div>
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
export default {
    data() {
        return {
            email: '',
            password: '',
            isExistUser:true,
            alert:''
        }
    },
    computed: {

    },
    methods: {
        login() {
            let user = JSON.parse(localStorage.getItem("user"))
           if (user) {
            if (user.email === this.email && user.password === this.password) {
                this.$router.push('/movies')
            } else {
                this.isExistUser = false
                this.alert = "Wrong data, please retry"
            }
            console.log({
                email: this.email,
                password: this.password
            })
           } else {
            this.isExistUser = false
            this.alert = "User doesn't exist, click create account to start with NetMovies"
           }
            
        }
    }
}
</script>

<style>
.container {
    border-radius: 4px;
}
</style>
  