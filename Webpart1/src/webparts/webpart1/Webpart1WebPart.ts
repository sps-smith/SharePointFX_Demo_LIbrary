
/// <reference path="../webpart1/WebpartVuex.ts"/>

import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './Webpart1WebPart.module.scss';
import * as strings from 'Webpart1WebPartStrings';
import Vue from 'vue';
import Vuex from 'vuex';
//import store from './Webpart1Vuex.js'
//import Hello from './components/Hello.vue'

export interface IWebpart1WebPartProps {
  description: string;
  message: string;
  dataset: string[];
} 

export default class Webpart1WebPart extends BaseClientSideWebPart<IWebpart1WebPartProps> {
  public data: IWebpart1WebPartProps;

  public render(): void {
    this.domElement.innerHTML = `
      <div id="app"></div>
        <h2>{{message}}</h2>
        <p v-for="item in dataset">{{item}}</p>
      </div>`;

      this.data = {
        description: this.properties.description,
        message: store.getters.getTitle,
        dataset: []
      };

      new Vue({
          el:`#app`,
          data: this.data          
      })
  }

  
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
