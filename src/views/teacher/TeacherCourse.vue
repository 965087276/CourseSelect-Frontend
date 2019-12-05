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