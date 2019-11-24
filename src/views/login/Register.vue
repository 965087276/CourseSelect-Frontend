<template>
    <div id="register">
        <div class="title">用户注册</div>
        <hr>
        <el-form
            :model="registerForm"
            status-icon
            :rules="rules"
            label-width="100px"
            :label-position="'left'"
            ref="registerForm"
        >
            <el-form-item label="账号" prop="username">
                <el-input v-model="registerForm.username"></el-input>
            </el-form-item>

            <el-form-item label="姓名" prop="realName">
                <el-input v-model="registerForm.realName" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="registerForm.password" auto-complete="off"></el-input>
            </el-form-item>

            <el-form-item label="重复密码" prop="password2">
                <el-input type="password" v-model="registerForm.password2" auto-complete="off"></el-input>
            </el-form-item>
            
            <el-form-item label="学院" prop="college">
                <el-select v-model="registerForm.college" placeholder="请选择学院">
                    <el-option label="计算机学院" value="计算机学院"></el-option>
                    <el-option label="人工智能学院" value="人工智能学院"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="专业" prop="major">
                <el-select v-model="registerForm.major" placeholder="请选择专业">
                    <el-option label="计算机应用技术" value="计算机应用技术"></el-option>
                    <el-option label="计算机体系结构" value="计算机体系结构"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="邮箱" prop="email">
                <el-input v-model="registerForm.email"></el-input>
            </el-form-item>
            
            <el-form-item label="联系方式" prop="phoneNumber">
                <el-input v-model="registerForm.phoneNumber"></el-input>
            </el-form-item>

            <el-form-item label="身份">
                <el-radio-group v-model="registerForm.role" size="medium">
                    <el-radio border label="学生"></el-radio>
                    <el-radio border label="老师"></el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import * as loginAPI from '@/api/login/api-login.js'
export default {
    data() {
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
               callback(new Error('请输入密码'));
            } 
            else {
                if (this.registerForm.password !== '') {
                    this.$refs.registerForm.validateField('password2');
                }
                callback();
            }
        };
        var validatePassword2 = (rule, value, callback) => {
            if (value == '') {
                callback(new Error('请再次输入密码'))
            }
            else if (value != this.registerForm.password) {
                callback(new Error('两次输入密码不一致'));
            }
            else {
                callback();
            }
        };

        return {
            registerForm: {
                username: '',
                realName: '',
                password: '',
                password2: '',
                email: '',
                college: '',
                major: '',
                phoneNumber: '',
                role: ''
            },
            rules: {
                username: [{ required: true, message: "请输入账号", trigger: "blur" }],
                realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { type: 'email',  message: "请输入正确的邮箱地址", trigger: "blur"}
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { validator: validatePassword, trigger: 'blur'}
                ],
                password2: [
                    { required: true, message: "请再次输入密码", trigger: "blur" },
                    { validator: validatePassword2, trigger: 'blur'}
                ],
                college: [
                    { required: true, message: "请选择学院", trigger: ["blur", "change"] }
                ],
                major: [
                    { required: true, message: "请选择专业", trigger: ["blur", "change"] }
                ],
                type: [
                    { required: true, message: "请选择身份", trigger: "change" }
                ]
            }
        }
    },
    methods: {
        submitForm(registerForm) {
            this.$refs.registerForm.validate(valid => {
                if (valid) {
                    let body = {
                        username: this.username,
                        realName: this.realName,
                        password: this.password,
                        email:  this.email,
                        college:  this.college,
                        major:    this.major,
                        phoneNumber: this.phoneNumber,
                        role: this.role
                    };
                    loginAPI.register(body)
                            .then(({data : body}) => {
                                this.$message("注册成功，请登录");
                                this.$router.push("/login");
                            })
                }
            })
        },
        resetForm(formName) {
            this.$ref[formName].resetFields();
        }
    }
}
</script>