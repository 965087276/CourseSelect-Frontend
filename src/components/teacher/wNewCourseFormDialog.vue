<template>
    <el-dialog
            title="添加课程"
            :visible.sync="dialogNewCourseFormVisible"
            width="40%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
    >
        <el-form
                :model="courseForm"
                status-icon
                :rules="rules"
                :label-width="$store.state.role == 'admin' ? '150px' : '100px'"
                :label-position="'left'"
                ref="courseForm"
        >
            <el-form-item label="课程名称" prop="courseName" style="width: 40%">
                <el-input v-model="courseForm.courseName" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="课程类型" prop="courseType">
                <el-select v-model="courseForm.courseType" placeholder="请选择课程类型">
                    <el-option label="专业核心课" value="专业核心课"></el-option>
                    <el-option label="专业研讨课" value="专业研讨课"></el-option>
                    <el-option label="专业普及课" value="专业普及课"></el-option>
                    <el-option label="公共必修课" value="公共必修课"></el-option>
                    <el-option label="公共选修课" value="公共选修课"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="课时" prop="courseHour">
                <el-select v-model="courseForm.courseHour" placeholder="请选择课时">
                    <el-option label="20" value="20"></el-option>
                    <el-option label="30" value="30"></el-option>
                    <el-option label="40" value="40"></el-option>
                    <el-option label="50" value="50"></el-option>
                    <el-option label="60" value="60"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="学分" prop="credit">
                <el-select v-model="courseForm.credit" placeholder="请选择课程学分">
                    <el-option label="0.5" value="0.5"></el-option>
                    <el-option label="1" value="1"></el-option>
                    <el-option label="1.5" value="1.5"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="限选人数" prop="limitNum" style="width: 40%">
                <el-input v-model.number="courseForm.limitNum" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="$store.state.role == 'admin'" label="授课教师" prop="courseTeacher" style="width: 40%">
                <el-input v-model="courseForm.courseTeacher" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-if="$store.state.role == 'admin'" label="授课教师教工号" prop="teacherId" style="width: 40%">
                <el-input v-model="courseForm.teacherId" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="起止周" required>
                <el-col :span="11">
                    <el-form-item prop="startWeek">
                        <el-select v-model="courseForm.startWeek" placeholder="请选择课程起始周">
                            <el-option
                                    v-for="item in weeks"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col class="line" :span="2">至</el-col>
                <el-col :span="11">
                    <el-form-item prop="endWeek">
                        <el-select v-model="courseForm.endWeek" placeholder="请选择课程结束周">
                            <el-option
                                    v-for="item in weeks"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item
                    v-for="(schedule, index) in courseForm.schedules"
                    :label="'课程安排' + (index+1)"
                    :key="index"
            >
                <el-col :span="6">
                    <el-form-item
                            :prop="'schedules.' + index + '.day'"
                            :key="index"
                            :rules="[{ required: true, message: '请选择上课时间', trigger: ['blur', 'change'] }]"
                    >
                        <el-select v-model="courseForm.schedules[index].day" placeholder="请选择上课时间">
                            <el-option
                                    v-for="item in weekdays"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                            :prop="'schedules.' + index + '.time'"
                            :rules="[{ required: true, message: '请选择上课节次', trigger: ['blur', 'change'] }]"
                    >
                        <el-select v-model="courseForm.schedules[index].time" placeholder="请选择上课节次">
                            <el-option
                                    v-for="item in times"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item
                            :prop="'schedules.' + index + '.classroom'"
                            :rules="[{ required: true, message: '请选择教室', trigger: ['blur', 'change'] }]"
                    >
                        <el-select v-model="courseForm.schedules[index].classroom" placeholder="请选择上课教室">
                            <el-option
                                    v-for="item in classrooms"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                            >
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button
                            type="info"
                            @click="deleteNewCourseSchedule(index)"
                            v-if="courseForm.schedules.length > 1"
                    >
                        删除
                    </el-button>
                </el-col>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('courseForm')">提交</el-button>
                <el-button type="success" @click="addCourseSchedule">新增课程时间</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

</template>

<script>
    import * as pubAPI from '@/api/pub/api-pub.js'
    import * as teacherAPI from '@/api/teacher/api-teacher.js'
    export default {
        name: "wNewCourseFormDialog.vue",
        props: {
            dialogNewCourseFormVisibleControl: {
                type: Boolean
            }
        },
        data() {
            return {
                dialogNewCourseFormVisible: false,
                courseForm: {
                    teacherId: '',
                    courseTeacher: '',
                    courseName: '',
                    courseType: '',
                    courseHour: '',
                    credit: '',
                    limitNum: '',
                    startWeek: '',
                    endWeek: '',
                    schedules: [{
                        day: '',
                        time: '',
                        classroom: ''
                    }]
                },
                rules: {
                    teacherId: [{required: true, message: "请输入授课教师教工号", trigger: "blur"}],
                    courseTeacher: [{required: true, message: "请输入授课教师名称", trigger: ["blur", "change"]}],
                    courseName: [{required: true, message: "请输入课程名称", trigger: "blur"}],
                    courseHour: [{required: true, message: "请选择课时", trigger: ["blur", "change"]}],
                    credit: [{required: true, message: "请选择课程学分", trigger: ["blur", "change"]}],
                    courseType: [{required: true, message: "请选择课程类型", trigger: ["blur", "change"]}],
                    limitNum: [
                        {required: true, message: "请输入限选人数", trigger: "blur"},
                        {type: 'number', message: '人数必须为数字值'}
                    ],
                    startWeek: [
                        {required: true, message: "请选择课程起始周", trigger: ["blur", "change"]}
                    ],
                    endWeek: [
                        {required: true, message: "请选择课程结束周", trigger: ["blur", "change"]}
                    ],
                },
                weeks: [],
                weekdays: [],
                times: [],
                classrooms: []
            }
        },
        methods: {
            init() {
                let chNum = ['一', '二', '三', '四', '五', '六', '日'];
                for (let i = 0; i < 18; i++) {
                    this.weeks[i] = {label: '第' + (i + 1) + '周', value: i + 1}
                }
                for (let i = 0; i < 7; i++) {
                    this.weekdays[i] = {label: '周' + chNum[i], value: i + 1}
                }
                for (let i = 0; i < 5; i++) {
                    this.times[i] = {label: '第' + (i + 1) + '节', value: i + 1}
                }
                pubAPI.getClassrooms()
                    .then(rooms => {
                        rooms.forEach(room => {
                            this.classrooms.push({
                                label: room,
                                value: room
                            })
                        })
                    })
                this.weeks.push();
                this.weekdays.push();
                this.times.push();
            },
            cancel() {
                this.$emit('update:dialogNewCourseFormVisibleControl', false)
            },
            submitForm(courseForm) {
                this.$refs.courseForm.validate(valid => {
                    if (valid) {
                        let body = this.courseForm;
                        body.college = this.$store.state.college;
                        if (this.$store.state.role == 'teacher') {
                            body.teacherId = this.$store.state.username;
                            body.courseTeacher = this.$store.state.realName;
                        }
                        body.schedules.forEach(schedule => {
                            schedule.startWeek = body.startWeek;
                            schedule.endWeek = body.endWeek;
                        })
                        teacherAPI.addCourse(body)
                            .then(body => {
                                this.$message({
                                    message: "添加成功",
                                    type: "success"
                                });
                                this.$emit('submit-form');
                            })
                    }
                })
            },
            addCourseSchedule() {
                this.courseForm.schedules.push({
                    startWeek: '',
                    endWeek: '',
                    classroom: ''
                })
            },
            deleteNewCourseSchedule(index) {
                this.courseForm.schedules.splice(index, 1);
            },
            openNewCourseDialog() {
                if (this.$refs.courseForm) {
                    this.$refs.courseForm.resetFields();
                }
                this.courseForm.schedules = [{
                    day: '',
                    time: '',
                    classroom: ''
                }]
                this.dialogNewCourseFormVisible = true;
            },
        },
        mounted() {
            this.init();
        },
        watch: {
            dialogNewCourseFormVisibleControl: function(newValue) {
                if (newValue == true) {
                    this.openNewCourseDialog();
                }
                else {
                    this.dialogNewCourseFormVisible = false;
                }
            }
        }
    }
</script>

<style scoped>

</style>