import { h } from 'preact';
import App from './app';
import Header from './header';
// import Button from './button';
import { mount, shallow } from 'enzyme';
import PreviewPane from './preview-pane';

describe('Main App', () => {
    let component;
    beforeEach(() => {
      component = mount(<App />, { attachTo: document.body });
    });
    afterEach(() => {
      component.unmount();
    });
  describe('Mounted functions', () => {
    it('should render the component without any errors', () => {
      expect(component.length).toBe(1);
    });
  
    it('should contain a Header component', () => {
      expect(component.contains(<Header />)).toBe(true);
    });
  
    it('should toggle the showPreview state and render a previewPane', () => {
      const button = component.find('button').at(1);
      expect(component.containsMatchingElement(<PreviewPane />)).toBe(false);
      button.simulate('click');
      expect(component.state().showPreview).toEqual(true);
      expect(component.containsMatchingElement(<PreviewPane />)).toBe(true);
    });
  
    it('should update the json preview when mounting with a filled out groups object', () => {
      const groups = {
        t9unovrta: {
          _id: "t9unovrta",
          id:"messages",
          title:"Feature/QUB-44 check session status",
          subtitle:"gbgb",
          fields: {
            zcekiqn56:{
              _id:"zcekiqn56",
              _groupId:"t9unovrta",
              key:"tenDollars",
              type:"String",
              label:"$10 Footlong",
              groupId:"messages",
              footnote:"Show me the 5",
              required:false,
              description:"checks for $10 coupon"
            },
            xck0uaa7y:{
              _id:"xck0uaa7y",
              _groupId:"t9unovrta",
              key:"tenDollars",
              type:"Boolean","label":"$10 Footlong",
              groupId:"messages","footnote":"Show me the 10",
              required:false,
              description:"checks for $10 coupon"
            },
            iv9cgsk6h:{
              _id:"iv9cgsk6h",
              _groupId:"t9unovrta",
              key:"fiveDollars",
              type:"Image",
              label:"$10 Footlong",
              groupId:"messages","footnote":"Show me the 5",
              required:true,
              description:"checks for $10 coupon"
            }
          }
        },
        yr2jgzh27:{
          _id:"yr2jgzh27",
          id:"",
          title:"",
          subtitle:"",
          fields: {
            fzwijope0:{
              _id:"fzwijope0",
              _groupId:"yr2jgzh27",
              key:"",
              type:"String",
              label:"","groupId":"",
              footnote:"",
              required:false,
              description:""
            }
          }
        }
      };
      const expectedJson = {
        "groups": [
          {
            "id": "messages",
            "title": "Feature/QUB-44 check session status",
            "subtitle": "gbgb"
          },
          {
            "id": "",
            "title": "",
            "subtitle": ""
          }
        ],
        "fields": [
          {
            "key": "tenDollars",
            "type": "String",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 5",
            "required": false,
            "description": "checks for $10 coupon"
          },
          {
            "key": "tenDollars",
            "type": "Boolean",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 10",
            "required": false,
            "description": "checks for $10 coupon"
          },
          {
            "key": "fiveDollars",
            "type": "Image",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 5",
            "required": true,
            "description": "checks for $10 coupon"
          },
          {
            "key": "",
            "type": "String",
            "label": "",
            "groupId": "",
            "footnote": "",
            "required": false,
            "description": ""
          }
        ]
      }
      component.instance().groups = groups;
      component.instance().updateCodePreview();
      const outputHTML = document.querySelector("#code-block").innerHTML;
      expect(outputHTML).toEqual(
        JSON.stringify(
          expectedJson,
          undefined,
          2
        )
      );
    });
  });

  // Test for update

  // Test for addField
    // How to test for a random string?

  // Test for deleteField

  describe('localStorage functions', () => {
    let component;
    beforeEach(() => {
      const groups = {"groups":{"t9unovrta":{"_id":"t9unovrta","id":"messages","title":"Feature/QUB-44 check session status","subtitle":"gbgb","fields":{"zcekiqn56":{"_id":"zcekiqn56","_groupId":"t9unovrta","key":"tenDollars","type":"String","label":"$10 Footlong","groupId":"messages","footnote":"Show me the 5","required":false,"description":"checks for $10 coupon"},"xck0uaa7y":{"_id":"xck0uaa7y","_groupId":"t9unovrta","key":"tenDollars","type":"Boolean","label":"$10 Footlong","groupId":"messages","footnote":"Show me the 10","required":false,"description":"checks for $10 coupon"},"iv9cgsk6h":{"_id":"iv9cgsk6h","_groupId":"t9unovrta","key":"fiveDollars","type":"Image","label":"$10 Footlong","groupId":"messages","footnote":"Show me the 5","required":true,"description":"checks for $10 coupon"}}},"yr2jgzh27":{"_id":"yr2jgzh27","id":"","title":"","subtitle":"","fields":{"fzwijope0":{"_id":"fzwijope0","_groupId":"yr2jgzh27","key":"","type":"String","label":"","groupId":"","footnote":"","required":false,"description":""}}}},"groupCount":2,"fieldsCount":4};
      localStorage.setItem('store', JSON.stringify(groups));
      component = shallow(<App />);
    });
    afterEach(() => {
      localStorage.clear();
    });

    it('should mount with the right json object when mounting with an existing localStorage object', () => {
      const expectedJson = {
        "groups": [
          {
            "id": "messages",
            "title": "Feature/QUB-44 check session status",
            "subtitle": "gbgb"
          },
          {
            "id": "",
            "title": "",
            "subtitle": ""
          }
        ],
        "fields": [
          {
            "key": "tenDollars",
            "type": "String",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 5",
            "required": false,
            "description": "checks for $10 coupon"
          },
          {
            "key": "tenDollars",
            "type": "Boolean",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 10",
            "required": false,
            "description": "checks for $10 coupon"
          },
          {
            "key": "fiveDollars",
            "type": "Image",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 5",
            "required": true,
            "description": "checks for $10 coupon"
          },
          {
            "key": "",
            "type": "String",
            "label": "",
            "groupId": "",
            "footnote": "",
            "required": false,
            "description": ""
          }
        ]
      }
      expect(component.instance().json).toEqual(expectedJson);
      localStorage.clear();
    });
    // deleteField
    it('should delete an input field from the json preview and state', () => {
      const updatedGroups = {
        t9unovrta: {
          _id: "t9unovrta",
          id:"messages",
          title:"Feature/QUB-44 check session status",
          subtitle:"gbgb",
          fields: {
            zcekiqn56:{
              _id:"zcekiqn56",
              _groupId:"t9unovrta",
              key:"tenDollars",
              type:"String",
              label:"$10 Footlong",
              groupId:"messages",
              footnote:"Show me the 5",
              required:false,
              description:"checks for $10 coupon"
            },
            xck0uaa7y:{
              _id:"xck0uaa7y",
              _groupId:"t9unovrta",
              key:"tenDollars",
              type:"Boolean",
              label:"$10 Footlong",
              groupId:"messages",
              footnote:"Show me the 10",
              required:false,
              description:"checks for $10 coupon"
            }
          }
        },
        yr2jgzh27:{
          _id:"yr2jgzh27",
          id:"",
          title:"",
          subtitle:"",
          fields: {
            fzwijope0:{
              _id:"fzwijope0",
              _groupId:"yr2jgzh27",
              key:"",
              type:"String",
              label:"","groupId":"",
              footnote:"",
              required:false,
              description:""
            }
          }
        }
      };
      const expectedJson = {
        "groups": [
          {
            "id": "messages",
            "title": "Feature/QUB-44 check session status",
            "subtitle": "gbgb"
          },
          {
            "id": "",
            "title": "",
            "subtitle": ""
          }
        ],
        "fields": [
          {
            "key": "tenDollars",
            "type": "String",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 5",
            "required": false,
            "description": "checks for $10 coupon"
          },
          {
            "key": "tenDollars",
            "type": "Boolean",
            "label": "$10 Footlong",
            "groupId": "messages",
            "footnote": "Show me the 10",
            "required": false,
            "description": "checks for $10 coupon"
          },
          {
            "key": "",
            "type": "String",
            "label": "",
            "groupId": "",
            "footnote": "",
            "required": false,
            "description": ""
          }
        ]
      }
      expect(component.instance().state.fields).toEqual(4);
      component.instance().deleteField('t9unovrta', 'iv9cgsk6h');
      expect(component.instance().state.fields).toEqual(3);
      expect(component.instance().groups).toEqual(updatedGroups);
      const outputHTML = document.querySelector("#code-block").innerHTML;
      expect(outputHTML).toEqual(
        JSON.stringify(
          expectedJson,
          undefined,
          2
        )
      );
    });
    // Test for addGroup
  
    it('should add a group to the groups object and state group counter', () => {  
      expect(component.instance().state.groups).toEqual(2);
      expect(Object.keys(component.instance().groups).length).toEqual(2);
      component.instance().addGroup();
      expect(component.instance().state.groups).toEqual(3);
      expect(Object.keys(component.instance().groups).length).toEqual(3);
    });

    // Test for deleteGroup
    it('should delete a group field from the json preview and state', () => {
      const updatedGroups = {
        yr2jgzh27:{
          _id:"yr2jgzh27",
          id:"",
          title:"",
          subtitle:"",
          fields: {
            fzwijope0:{
              _id:"fzwijope0",
              _groupId:"yr2jgzh27",
              key:"",
              type:"String",
              label:"","groupId":"",
              footnote:"",
              required:false,
              description:""
            }
          }
        }
      };
      const expectedJson = {
        "groups": [
          {
            "id": "",
            "title": "",
            "subtitle": ""
          }
        ],
        "fields": [
          {
            "key": "",
            "type": "String",
            "label": "",
            "groupId": "",
            "footnote": "",
            "required": false,
            "description": ""
          }
        ]
      }
      expect(component.instance().state.groups).toEqual(2);
      expect(component.instance().state.fields).toEqual(4);
      component.instance().deleteGroup('t9unovrta');
      expect(component.instance().state.groups).toEqual(1);
      expect(component.instance().state.fields).toEqual(1);
      expect(component.instance().groups).toEqual(updatedGroups);
      const outputHTML = document.querySelector("#code-block").innerHTML;
      expect(outputHTML).toEqual(
        JSON.stringify(
          expectedJson,
          undefined,
          2
        )
      );
    });


    // resetForm
    it('should reset the form to an original state', () => {
      const expectedJson = {
        "groups": [],
        "fields": []
      }
      const initialLocalStorageObject = {"groups":{"t9unovrta":{"_id":"t9unovrta","id":"messages","title":"Feature/QUB-44 check session status","subtitle":"gbgb","fields":{"zcekiqn56":{"_id":"zcekiqn56","_groupId":"t9unovrta","key":"tenDollars","type":"String","label":"$10 Footlong","groupId":"messages","footnote":"Show me the 5","required":false,"description":"checks for $10 coupon"},"xck0uaa7y":{"_id":"xck0uaa7y","_groupId":"t9unovrta","key":"tenDollars","type":"Boolean","label":"$10 Footlong","groupId":"messages","footnote":"Show me the 10","required":false,"description":"checks for $10 coupon"},"iv9cgsk6h":{"_id":"iv9cgsk6h","_groupId":"t9unovrta","key":"fiveDollars","type":"Image","label":"$10 Footlong","groupId":"messages","footnote":"Show me the 5","required":true,"description":"checks for $10 coupon"}}},"yr2jgzh27":{"_id":"yr2jgzh27","id":"","title":"","subtitle":"","fields":{"fzwijope0":{"_id":"fzwijope0","_groupId":"yr2jgzh27","key":"","type":"String","label":"","groupId":"","footnote":"","required":false,"description":""}}}},"groupCount":2,"fieldsCount":4}
      const expectedLSObject = {"groups":{},"groupCount":0,"fieldsCount":0}

      expect(component.instance().state.groups).toEqual(2);
      expect(component.instance().state.fields).toEqual(4);
      expect(JSON.parse(localStorage.getItem('store'))).toEqual(initialLocalStorageObject);

      component.instance().resetForm();
      
      expect(component.instance().state.groups).toEqual(0);
      expect(component.instance().state.fields).toEqual(0);
      expect(JSON.parse(localStorage.getItem('store'))).toEqual(expectedLSObject);

      expect(component.instance().groups).toEqual({});

      const outputHTML = document.querySelector("#code-block").innerHTML;
      expect(outputHTML).toEqual(
        JSON.stringify(
          expectedJson,
          undefined,
          2
        )
      );
    });
  });
  // Test for updateGroup
});
