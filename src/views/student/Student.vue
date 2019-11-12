<template>
    <div id="login">
        Student
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {},
        mounted() {}
    };
</script>

<style lang="scss" scoped>
    #login {
        .title {
            font-size: 1.5rem;
        }
        .btn_box {
            float: right;
            @media screen and (max-width: 560px) {
                float: initial;
                display: flex;
                justify-content: center;
                margin-left: -50px;
                margin-top: 10px;
            }
        }
        .rememberPwd {
            margin-left: 50px;
            margin-bottom: 20px;
        }
    }
</style>

