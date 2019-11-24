import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        uid: '',
        username: '',
        realName: '',
        role: '',
        college: '',
        token: ''
    },
    mutations: {
        updateToken(state, token) {
            state.token = token;
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
