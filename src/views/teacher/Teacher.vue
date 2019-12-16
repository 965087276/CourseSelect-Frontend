<template>
    <div id="admin" class="full_screen">
        <el-container>
            <el-aside>
                <user-info class="user_info"></user-info>
                <el-menu
                        class="nav_bar"
                        default-active="course-manage/courses"
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
                        <!--                        <el-menu-item index="course-maneger/add">增添课程</el-menu-item>-->
                        <el-menu-item index="course-manage/courses">课程列表</el-menu-item>
                        <el-menu-item index="course-manage/grades">成绩管理</el-menu-item>
                        <el-menu-item index="course-manage/schedules">上课课表</el-menu-item>
                    </el-submenu>
                    <!--                    <el-menu-item index="teacherCourseTable">-->
                    <!--                    <template slot="title">-->
                    <!--                            <i class="el-icon-location"></i>-->
                    <!--                            <span>查看上课课表</span>-->
                    <!--                    </template>-->
                    <!--                </el-menu-item>-->
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
                console.log(index)
                this.$router.push("/teacher/" + index);
            },
            exit() {

            }

        },
        mounted() {
        }
    };
</script>

<style lang="scss" scoped>

</style>