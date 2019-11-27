<template>
    <div id="student" class="full_screen">
        <el-container>
            <el-aside>
                <user-info class="user_info"></user-info>
                <el-menu
                    class="nav_bar"
                    default-active="studentCourse"
                    background-color="#1d2b36"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    @select="selectMenu"
                >
                    <el-menu-item index="course-list">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>课程列表</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="preselect">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>课程预选</span>
                        </template>
                        <el-menu-item index="preselect/my">我的预选</el-menu-item>
                    </el-submenu>
                    <el-submenu index="course-select">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>选修课程</span>
                        </template>
                        <el-menu-item index="course-select/select">选择课程</el-menu-item>
                        <el-menu-item index="course-select/my_course_table">我的课表</el-menu-item>
                        <el-menu-item index="course-select/stats">选课学分统计</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="grades">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>我的成绩</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <div class="title">学生选课系统</div>
                <el-button class="exit_btn" type="danger" @click="exit">退出</el-button>
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
                alert(index)
                this.$router.push("/student/" + index);
            },
            exit() {
                
            }
            
        },
        mounted() {}
    };
</script>

<style lang="scss" scoped>
    
</style>

