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
            <el-form-item label="账号" prop="userName">
                <el-input v-model="loginForm.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginClick">登录</el-button>
                <el-button type="success" @click="registerClick">注册</el-button>
                <el-button type="success" @click="forgetPasswordClick">忘记密码</el-button>
            </el-form-item>
        </el-form>
            
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loginForm: {
                    userName: '',
                    password: ''
                },
                rules: {
                    userName: [{ required: true, message: '用户名不能为空'}],
                    password: [{ required: true, message: '密码不能为空'}]
                }
            }
        },
        methods: {
            loginClick() {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        // 表单校验正确，准备登录
                        
                    }
                })
            }
        }
    }
        
</script>

<style lang = "scss" scoped>

</style>