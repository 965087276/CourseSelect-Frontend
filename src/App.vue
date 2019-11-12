<template>
    <div id="app">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: true
            }
        },
        methods: {

        },
        mounted() {
        }
    }
</script>


