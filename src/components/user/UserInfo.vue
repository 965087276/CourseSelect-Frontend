<template>
    <div id="userInfo">
        <div class="name">{{$store.state.realName}}</div>
        <div class="role">
            <span>{{$store.state.role}}</span>
        </div>
        <div class="account">学号/工号：{{$store.state.username}}</div>
        <div class="account" v-if="$store.state.college != ''">学院：{{$store.state.college}}</div>
        <div style="margin: 18px 2px 10px 2px">
            <el-button type="primary" round @click="openEditUserDialog">修改信息</el-button>
            <el-button type="danger" round @click="exit">退出登录</el-button>
        </div>
        <!-- <div class="account semester" v-if="$store.state.semester != ''">学期：{{$store.state.semester | semester}}</div> -->
        <el-dialog title="修改个人信息" :visible.sync="dialog" width="30%" :modal-append-to-body='false'>
            <el-form
                    :model="userForm"
                    status-icon
                    :rules="rules"
                    label-width="100px"
                    :label-position="'left'"
                    ref="userForm"
            >
                <el-form-item label="账号" prop="username">
                    <el-input v-model="userForm.username" :disabled="true"></el-input>
                </el-form-item>

                <el-form-item label="姓名" prop="realName">
                    <el-input v-model="userForm.realName" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="学院" prop="college">
                    <el-select v-model="userForm.college" placeholder="请选择学院">
                        <el-option label="计算机学院" value="计算机学院"></el-option>
                        <el-option label="人工智能学院" value="人工智能学院"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>

                <el-form-item label="联系方式" prop="phoneNumber">
                    <el-input v-model="userForm.phoneNumber"></el-input>
                </el-form-item>

                <el-divider style="margin: 20px"></el-divider>

                <div class="dialog-header">
                    <span class="dialog-title">修改密码（需要修改密码时请填写）</span>
                </div>
<!--                修改密码时填下面三项-->
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="userForm.oldPassword" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="新密码" prop="password">
                    <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item label="重复密码" prop="password2">
                    <el-input type="password" v-model="userForm.password2" auto-complete="off"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="submitForm('userForm')">提交</el-button>
                    <el-button @click="cancel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

    </div>



</template>

<script>
    import * as pubAPI from '@/api/pub/api-pub.js'
    export default {
        data() {
            var validateOldPassword = (rule, value, callback) => {
                if (this.userForm.password != '' || this.userForm.password2 != '') {
                    if (value == '') {
                        callback(new Error('请输入旧密码'));
                    }
                    else {
                        callback();
                    }
                }
                else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (this.userForm.password2 != '') {
                    if (value == '') {
                        callback(new Error('请输入新密码'));
                    }
                    else {
                        callback();
                    }
                }
                else {
                    callback();
                }
            };
            var validatePassword2 = (rule, value, callback) => {
                if (this.userForm.password != '') {
                    if (value == '') {
                        callback(new Error('请再次输入新密码'));
                    }
                    else if (value != this.userForm.password) {
                        callback(new Error('两次输入密码不一致'));
                    }
                    else {
                        callback();
                    }
                }
                else {
                    callback();
                }
            };
            return {
                dialog: false,
                userForm: {
                    username: '',
                    realName: '',
                    oldPassword: '',
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
                    college: [
                        { required: true, message: "请选择学院", trigger: ["blur", "change"] }
                    ],
                    oldPassword: [
                        { validator: validateOldPassword, trigger: 'blur' }
                    ],
                    password: [
                        // { required: true, message: "请输入密码", trigger: "blur" },
                        { validator: validatePassword, trigger: 'blur'}
                    ],
                    password2: [
                        // { required: true, message: "请再次输入密码", trigger: "blur" },
                        { validator: validatePassword2, trigger: 'blur'}
                    ],

                }
            };
        },
        methods: {
            submitForm(userForm) {
                this.$refs.userForm.validate(valid => {
                    if (valid) {
                        pubAPI.updateUsers(userForm)
                            .then(body => {
                                this.$message({
                                    type: "success",
                                    message: "修改成功"
                                });
                                this.$store.commit("updateUserInfo")
                                this.dialog = false;
                            })
                    }
                })
            },
            cancel() {
                this.dialog = false;
            },
            openEditUserDialog() {
                if (this.$refs.userForm) {
                    this.$refs.userForm.resetFields();
                }
                this.initUserForm();
                this.dialog = true;
            },
            initUserForm() {
                for (let key in this.userForm) {
                    if (this.$store.state[key] != null) {
                        this.userForm[key] = this.$store.state[key];
                    }
                }
            },
            exit() {
                this.$store.commit("clear");
                this.$router.push({name: 'login'});
            }
        }
    };
</script>

<style lang='scss' scoped>
    #userInfo {
        width: 299px;
        height: fit-content;
        background: #1d2b36;
        color: white;
        padding: 20px;
        box-sizing: border-box;
        border-bottom: 2px solid #121f28;

        .name {
            background-color: #6C6FC0;
            width: 150px;
            height: 150px;
            border-radius: 150px;
            line-height: 120px;
            text-align: center;
            margin: 0 auto;
            font-size: 1.5rem;
            margin-bottom: 20px;
            // border: 5px solid white;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.8);
        }

        .role {
            text-align: center;
            position: relative;
            top: -80px;

            span {
                text-align: center;
                font-size: 14px;
                display: inline;
                padding: 3px 10px;
                border-radius: 10px;
                font-weight: bold;
            }
        }

        .account {
            color: rgba(211, 211, 211, 0.664);
            font-size: 14px;
            text-align: center;
            margin-bottom: 10px;
        }

        .dialog-header {
            padding: 0px 20px 30px
        }

        .dialog-title {
            line-height: 24px;
            font-size: 18px;
            color: #303133;
        }
    }
</style>