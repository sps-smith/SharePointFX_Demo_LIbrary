
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default class vueStore

const store = new Vuex.Store({
    state:{
        _data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
        _title: "This is a Test to see"
    },
    getters:{
        getData: (state) =>{
            return state._data;
        },
        getTitle: (state) =>{
            return state._title;
        }
    },
    mutations:{

    },
    actions:{

    }

})


