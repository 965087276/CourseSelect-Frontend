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
            <el-form-item label="账号" prop="userCode">
                <el-input v-model="loginForm.userCode"></el-input>
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
                    userCode: '',
                    password: ''
                },
                rules: {
                    userCode: [{ required: true, message: '账号不能为空'}],
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
                        loginAPI.login(this.loginForm.userCode, this.loginForm.password)
                            .then(({data : body}) => {
                                // alert('登陆成功，准备跳转')
                                this.$message("登陆成功，正在跳转");
                                // 保存token
                                localStorage.setItem("token", body.token);
                                this.$store.commit("updateToken", body.token);         
                                setTimeout(() => {
                                    this.routeToUserNav(this.loginForm.userCode);
                                }, 1000);
                            })
                    }
                })
            },
            // 按角色跳转到不同页面
            routeToUserNav(userCode) {
                loginAPI.getUserInfo(userCode)
                    .then(({data: {body}}) => {
                        this.$store.commit("setData", body);
                        switch (this.$store.state.identity) {
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