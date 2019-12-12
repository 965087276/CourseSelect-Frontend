import Vue from 'vue'
import Vuex from 'vuex'
import {getCourseSelectStatus} from '@/api/pub/api-pub.js'
import {getUserInfo} from '@/api/login/api-login.js'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        uid: '',
        username: '',
        realName: '',
        role: '',
        college: '',
        authToken: '',
        email: '',
        phoneNumber: '',
        canSelect: false
    },
    mutations: {
        clear() {
            for (let key in this.state) {
                this.state[key] = ''
            }
        },
        updateUserInfo() {
            getUserInfo().then(body => {
                for (let key in body) {
                    this.state[key] = body[key];
                }
            })
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
