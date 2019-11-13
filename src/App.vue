<template>
    <div id="app"  v-loading.fullscreen.lock="loading" element-loading-text="正在验证用户身份">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false
            }
        },
        methods: {

        },
        mounted() {
        }
    }
</script>


