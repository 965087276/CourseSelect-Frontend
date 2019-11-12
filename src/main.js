import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './Common.vue'
import axios from 'axios'

// 饿了么UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
// 将引入的全局设置文件绑定到Vue的COMMON属性上
Vue.prototype.COMMON = global

Vue.use(ElementUI)

axios.defaults.baseURL = global.host;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
