import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class SocialButton extends Vue  {

    private clicked(){
        alert("Yes");
    }

}