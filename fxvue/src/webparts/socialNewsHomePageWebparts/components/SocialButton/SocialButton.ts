import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

@Component
export default class SocialButton extends Vue  {

    private clicked(){
        alert("Yes");
    }

}
