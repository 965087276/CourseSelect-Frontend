<template>
    <div id="admin" class="full_screen">
        <el-container>
            <el-aside>
                <user-info class="user_info"></user-info>
                <el-menu
                    class="nav_bar"
                    default-active="teacher"
                    background-color="#1d2b36"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="selectMenu"
                >
                    <el-submenu index="course-manager">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>课程管理</span>
                        </template>
                        <el-menu-item index="course-maneger/add">增添课程</el-menu-item>
                        <el-menu-item index="course-maneger/grades">录入成绩</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="courseList">
                    <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>查看上课课表</span>
                    </template>
                </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <transition>
                    <router-view class="router"></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import userInfo from "@/components/user/UserInfo"
    export default {
        data() {
            return {}
        },
        components: {
            "user-info": userInfo
        },
        methods: {
            selectMenu(index) {
                this.$router.push("/teacher/" + index);
            },
            exit() {
                
            }
            
        },
        mounted() {}
    };
</script>

<style lang="scss" scoped>
    
</style>