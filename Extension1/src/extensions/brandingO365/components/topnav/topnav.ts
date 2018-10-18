import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class topnav extends Vue{

	private tesing(payload: number): void{
		alert(payload);
	}
}
