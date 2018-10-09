import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'SocialNewsHomePageWebpartsWebPartStrings';

// Importing Vue.js
import Vue from 'vue';
// Improting Vue.js SFC
import SocialNewsHomePageWebpartsComponent from './components/SocialNewsHomePageWebparts.vue';
// import SocialButton from '../components/SocialButton.vue';

export interface ISocialNewsHomePageWebpartsWebPartProps {
  description: string;
}

export default class SocialNewsHomePageWebpartsWebPart extends BaseClientSideWebPart<ISocialNewsHomePageWebpartsWebPartProps> {

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    let el = new Vue({
      el: `#${id}`,
      render: h => h(SocialNewsHomePageWebpartsComponent, {
        props: {
          description: this.properties.description
        }
      })
    });
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
