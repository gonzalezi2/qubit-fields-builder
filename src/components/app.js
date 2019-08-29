/* eslint-disable indent */
import { h, Component } from 'preact';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

import Header from './header';
import PreviewPane from './preview-pane';
import Button from './button';
import InputGroup from './input-group';

export default class App extends Component {
  state = {
    // eslint-disable-next-line indent
    showPreview: false,
    groups: 0,
    fields: 0
  };
  groups = {};
  json = {
    groups: [],
    fields: []
  }

	togglePreviewPane = () => {
    this.setState({ showPreview: !this.state.showPreview });
    document.body.classList.toggle('no-scroll');
  }
  
  getRandomId = () => Math.random().toString(36).substr(2, 9);

  createJSONCode = () => {
    // eslint-disable-next-line guard-for-in
    let groupsArr= [];
    let fieldsArr = [];
    for (const prop in this.groups) {
      if (this.groups.hasOwnProperty(prop)) {
        // eslint-disable-next-line no-unused-vars
        const { _id, fields, ...groupProps } = this.groups[prop];
        for (const prop in fields) {
          if (fields.hasOwnProperty(prop)) {
            // eslint-disable-next-line no-unused-vars
            const { _id, _groupId, ...fieldProps } = fields[prop];
            fieldsArr.push(fieldProps);
          }
        }
        groupsArr.push(groupProps);
      }
    }
    this.json.groups = groupsArr;
    this.json.fields = fieldsArr;
  }

  updateLocalStorage = () => {
    localStorage.setItem('store', JSON.stringify({
      groups: this.groups,
      groupCount: this.state.groups,
      fieldsCount: this.state.fields
    }));
  }
  
  updateCodePreview() {
    this.createJSONCode();
    document.querySelector('#code-block').innerHTML = JSON.stringify(this.json, undefined, 2);
    setTimeout(() => Prism.highlightAll(), 0);
  }

  update = () => {
    this.updateLocalStorage();
    this.updateCodePreview();
  }

  createNewGroup = () => ({
    _id: this.getRandomId(),
    id: '',
    title: '',
    subtitle: '',
    fields: {}
  });

  createNewField = (groupId, groupKey) => ({
    _id: this.getRandomId(),
    _groupId: groupId,
    key: '',
    type: 'String',
    label: '',
    groupId: groupKey,
    footnote: '',
    required: false,
    description: ''
  });

	addField = (groupId, groupKey) => {
      const newField = this.createNewField(groupId, groupKey);
      // state.fields.groups[groupId].fields = newGroup;
      this.groups[groupId].fields[newField._id] = newField;
      // return state.fields.fields.push(newField);
      
    this.setState({ fields: this.state.fields + 1 }, this.update );
  }
  
  deleteField = (groupId, fieldId) => {
    delete this.groups[groupId].fields[fieldId];
    this.setState({ fields: this.state.fields - 1 });
    this.updateGroup(this.groups[groupId]);
  }
  
  addGroup = () => {
    const newGroup = this.createNewGroup();
    this.groups[newGroup._id] = newGroup;
    this.setState({ groups: this.state.groups + 1 }, this.update);
  }

  updateGroup = (group) => {
    // Loop through the updated group's fields to check for a change in the group id
    const fieldKeys = Object.keys(group.fields);
    if (fieldKeys.length >= 1) {
        fieldKeys.map((fieldId) => {
          // Check the group's fields to see if the groupId has changed and change the fields groupId to match
          if (group.fields[fieldId]._groupId ===  group._id && group.id !== group.fields[fieldId].groupId) {
            group.fields[fieldId].groupId = group.id;
          }
        });
    }
    this.groups[group._id] = group;
    this.update();
  }

  deleteGroup = (groupId) => {
    const fieldsToDelete = Object.keys(this.groups[groupId].fields).length;
    delete this.groups[groupId];

    const newGroupCount = this.state.groups - 1;
    const newFieldsCount = this.state.fields - fieldsToDelete;

    this.setState({
      groups: newGroupCount,
      fields: newFieldsCount
    }, this.update);
  }

  componentWillMount() {
    const localStorageGroup = JSON.parse(localStorage.getItem('store'));
    if (localStorageGroup && localStorageGroup.groupCount >= 1) {
      this.groups = localStorageGroup.groups;
      this.setState({
        groups: localStorageGroup.groupCount,
        fields: localStorageGroup.fieldsCount
      });
    }
  }

  componentDidMount() {
    if (Object.keys(this.groups).length === 0) {
      this.addGroup();
    }
    this.update();
  }

  render() {
	  return (
	    <div id="app">
	      <Header />
	      <div className="header">
	        <div className="container">
	          <h1>New Fields File</h1>
	          <Button text="Preview" buttonClass="primary" clickHandler={this.togglePreviewPane} />
	        </div>
	      </div>

	      <div className="container">
	        {/* Grouped Fields */}
	        <div className="group-box">
            <div className="group-header">
              <h3>Groups</h3>
            </div>
            <div className="group-body">
              {
                Object.keys(this.groups).length < 1 &&  <div className="emptyGroup"><h3>-</h3></div>
              }
              {
                Object.keys(this.groups).length >= 1 && Object.keys(this.groups).map(groupId => (
                  <InputGroup
                    key={groupId}
                    group={this.groups[groupId]}
                    deleteGroup={this.deleteGroup}
                    addField={this.addField}
                    deleteField={this.deleteField}
                    saveGroup={this.updateGroup}
                  />)
                )
              }
            </div>
	        </div>
          <Button text="Add Group" buttonClass="primary-large" clickHandler={this.addGroup} />
          <pre className="line-numbers">
            <code id="code-block" className="language-js" />
          </pre>
	      </div>
	      {this.state.showPreview ? <PreviewPane groups={this.groups} handleClose={this.togglePreviewPane} /> : null}
	    </div>
	  );
  }
}
