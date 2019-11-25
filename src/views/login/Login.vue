<template>
    <div id="login">
        <div class="title">用户登录</div>
        <hr>
        <el-form 
            ref="loginForm" 
            :rules="rules"
            :model="loginForm" 
            label-width="80px"
        >
            <el-form-item label="账号" prop="username">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginClick">登录</el-button>
                <el-button type="success" @click="$router.push('/register')">注册</el-button>
                <el-button type="success" @click="forgetPasswordClick">忘记密码</el-button>
            </el-form-item>
        </el-form>
            
    </div>
</template>

<script>
    import * as loginAPI from '@/api/login/api-login.js'

    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{ required: true, message: '账号不能为空'}],
                    password: [{ required: true, message: '密码不能为空'}]
                }
            }
        },
        methods: {
            forgetPasswordClick() {},
            // 登录
            loginClick() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        // 表单校验正确，准备登录
                        loginAPI.login(this.loginForm.username, this.loginForm.password)
                            .then(body => {
                                switch (body.code) {
                                    case 200:
                                        // alert('登陆成功，准备跳转')
                                        this.$message("登陆成功，正在跳转");
                                        // 保存token
                                        localStorage.setItem("authToken", body.authToken);
                                        this.$store.commit("updateToken", body.authToken);
                                        setTimeout(() => {
                                            this.routeToUserNav(this.loginForm.username);
                                        }, 1000);
                                        break;
                                    default:
                                        this.$message(body.message)
                                }
                            })
                    }
                })
            },
            // 按角色跳转到不同页面
            routeToUserNav(username) {
                loginAPI.getUserInfo(username)
                    .then(body => {
                        this.$store.commit("setData", body);
                        switch (this.$store.state.role) {
                            case "student":
                                this.$router.push({ name: 'student'})
                                break;
                            case "teacher":
                                this.$router.push({ name: 'teacher'})
                                break;
                            case "admin":
                                this.$router.push({ name: 'admin'})
                                break;
                        }
                    })
            }
        }
    }
        
</script>

<style lang = "scss" scoped>

</style>