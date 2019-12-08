import Vue from 'vue'
import Vuex from 'vuex'
import {getCourseSelectStatus} from '@/api/pub/api-pub.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        uid: '',
        username: '',
        realName: '',
        role: '',
        college: '',
        authToken: '',
        canSelect: false
    },
    mutations: {
        clear() {
            for (let key in this.state) {
                this.state[key] = ''
            }
        },
        updateCanSelect() {
            getCourseSelectStatus().then(status => this.state.canSelect = status)
        },
        updateToken(state, authToken) {
            state.authToken = authToken;
        },
        setData(state, obj) {
            for (let key in obj) {
                if (obj[key] == null) {
                    state[key] = "";
                }
                else {
                    state[key] = obj[key].toString();
                }
            }
        }
    },
    actions: {
    },
    modules: {
    }
})
