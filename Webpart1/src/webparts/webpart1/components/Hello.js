

<template>
    <div>
        <h2>This Works</h2>
        <p v-for="item in dataset" :key="item">{{item}}</p>
    </div>
</template>

import Vue from 'vue';
import store from '../WebpartVuex';
//import { Prop } from 'vue-property-decorator';

export default class Hello {
    // @Prop()
    // public dataset: string[]
    //store,
   // name: 'textp',
    data(){
        return{
            dataset: store.getters.getData
        }
    }
}
