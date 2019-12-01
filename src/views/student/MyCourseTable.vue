<template>
    <div id="studentCourse">
        <h1>学生课表</h1>
        <div class="table">
            <div class="table_head">
                <div class="day">周一</div>
                <div class="day">周二</div>
                <div class="day">周三</div>
                <div class="day">周四</div>
                <div class="day">周五</div>
                <div class="day">周六</div>
                <div class="day">周日</div>
            </div>
            <div class="table_main">
                <div class="table_aside">
                    <div class="time">1</div>
                    <div class="time">2</div>
                    <div class="time">3</div>
                    <div class="time">4</div>
                    <div class="time">5</div>
                </div>
                <div class="table_content">
                    <div class="class" v-for="(item,index) in data" :key="index">
                        <div class="no_class" v-if="item.length == 0"  @click="routeTo(index)">无课</div>
                        <div class="class_inner" v-else-if="item.length == 1">
                            <div class="course">{{item[0].courseName}}</div>
                            <div class="class_info">
                                <div class="student">
                                    <i class="el-icon-info"></i>
                                    {{item[0].courseTeacher}}
                                </div>
                                <div class="classroom">
                                    <i class="el-icon-location"></i>
                                    {{item[0].classroom}}
                                </div>
                            </div>
                        </div>
                        <div class="class_inner" style="background-color: rgb(39, 247, 133); cursor: pointer" v-else @click="getNextCourse(index, item.length)">
                            <div class="course">{{ item[dataPos[index]].courseName }}</div>
                            <div class="class_info">
                                <div class="student">
                                    <i class="el-icon-info"></i>
                                    {{ item[dataPos[index]].courseTeacher }}
                                </div>
                                <div class="classroom">
                                    <i class="el-icon-location"></i>
                                    {{ item[dataPos[index]].classroom }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import * as studentAPI from '@/api/student/api-student.js'
    export default {
        data() {
            return {
                data: [],
                dataPos: [],
            };
        },
        methods: {
            getNextCourse(index, itemLength) {
                let v = (this.dataPos[index] + 1) % parseInt(itemLength);
                this.$set(this.dataPos, index, v);
            },
            routeTo(index) {
                let day = parseInt(index / 5) + 1
                let time = index % 5 + 1
                let isCourseTable = true
                this.$router.push({name: 'course-select', params: {day, time, isCourseTable} })
            },
            parseData(data) {
                let finalData = [];
                for (let i = 0; i < 35; i++) {
                    finalData[i] = []
                    this.dataPos[i] = 0
                }
                for (let i in data) {
                    let day = parseInt(data[i].day);
                    let time = parseInt(data[i].time);
                    let index = (day - 1) * 5 + time - 1;
                    finalData[index].push(data[i]);
                }
                return finalData;
            },
            getStudentClass() {
                studentAPI.getStudentCourseTable(this.$store.state.username)
                    .then(res => {
                        this.data = this.parseData(res);
                    });
            }
        },
        mounted() {
            this.getStudentClass();
        }
    };
</script>

<style lang='scss' scoped>
    .table_head {
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
        margin: 0 0 20px 85px;
        display: flex;
        .day {
            width: 14.286%;
            text-align: center;
        }
    }
    .table_main {
        display: flex;
        .table_aside {
            width: 50px;
            height: 750px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
            padding: 10px;
            margin-right: 20px;
            .time {
                line-height: 150px;
                text-align: center;
                font-size: 1.5rem;
            }
        }
        .table_content {
            height: 750px;
            background-color: #fff;
            border-radius: 10px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
            position: relative;
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            width: 100%;
            .class {
                height: 150px;
                width: 14.28%;
                padding: 10px;
                box-sizing: border-box;
                @media screen and (max-width: 1540px) {
                    font-size: 14px;
                    .course {
                        min-height: 50px !important;
                        font-size: 1rem !important;
                    }
                    .class_info {
                        display: block !important;
                        line-height: 20px !important;
                    }
                }
                .class_inner {
                    background: #409eff;
                    height: 100%;
                    border-radius: 10px;
                    padding: 20px;
                    box-sizing: border-box;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
                    .course {
                        color: white;
                        font-size: 1.2rem;
                        font-weight: bold;
                        min-height: 65px;
                    }
                    .class_info {
                        display: flex;
                        line-height: 30px;
                        color: white;
                        .student {
                            margin-right: 10px;
                        }
                    }
                }
                .no_class {
                    background-color: rgba(0, 0, 0, 0.05);
                    height: 100%;
                    border-radius: 10px;
                    padding: 20px;
                    box-sizing: border-box;
                    line-height: 90px;
                    text-align: center;
                    font-size: 1.2rem;
                    font-weight: lighter;
                    color: rgba(0, 0, 0, 0.3);
                    cursor: pointer
                }
            }
        }
    }
    .notifys {
        background-color: #409eff !important;
        color: #fff !important;
    }
</style>