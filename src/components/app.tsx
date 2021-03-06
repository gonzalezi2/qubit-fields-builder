/* eslint-disable indent */
import { h, Component } from "preact";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

import Header from "./header";
import PreviewPane from "./preview-pane";
import Button from "./button";
import InputGroup from "./input-group";
import {
  createNewField,
  createNewGroup,
  createJSONCode,
  updateGroupId,
  updateLocalStorage,
  createNewConstraint,
} from "../utils";
import { Group } from "src/interfaces";

interface State {
  showPreview: boolean;
  groups: number;
  fields: number;
}

export default class App extends Component<{}, State> {
  state = {
    showPreview: false,
    groups: 0,
    fields: 0,
  };

  groups = {};
  json = {
    groups: [],
    fields: [],
  };

  togglePreviewPane = () => {
    this.setState({ showPreview: !this.state.showPreview });
    document.body.classList.toggle("no-scroll");
  };

  updateCodePreview() {
    this.json = createJSONCode(this.groups);
    document.querySelector("#code-block").innerHTML = JSON.stringify(this.json, undefined, 2);
    setTimeout(() => Prism.highlightAll(), 0);
  }

  resetForm = () => {
    this.groups = {};
    this.json = {
      groups: [],
      fields: [],
    };
    this.setState(
      {
        // eslint-disable-next-line indent
        showPreview: false,
        groups: 0,
        fields: 0,
      },
      () => {
        this.update();
        this.addGroup();
      },
    );
  };

  update = () => {
    updateLocalStorage(this.groups, this.state);
    this.updateCodePreview();
  };

  addField = (groupId: string, groupKey: string) => {
    const newField = createNewField(groupId, groupKey);
    // state.fields.groups[groupId].fields = newGroup;
    this.groups[groupId].fields[newField._id] = newField;
    // return state.fields.fields.push(newField);

    this.setState({ fields: this.state.fields + 1 }, this.update);
  };

  deleteField = (groupId: string, fieldId: string) => {
    delete this.groups[groupId].fields[fieldId];
    this.setState({ fields: this.state.fields - 1 });
    this.updateGroup(this.groups[groupId]);
  };

  addGroup = () => {
    const newGroup = createNewGroup();
    this.groups[newGroup._id] = newGroup;
    this.setState({ groups: this.state.groups + 1 }, this.update);
  };

  updateGroup = (group: Group) => {
    // Loop through the updated group's fields to check for a change in the group id
    this.groups[group._id] = updateGroupId(group);
    this.update();
  };

  deleteGroup = (groupId: string) => {
    const fieldsToDelete = Object.keys(this.groups[groupId].fields).length;
    delete this.groups[groupId];

    const newGroupCount = this.state.groups - 1;
    const newFieldsCount = this.state.fields - fieldsToDelete;

    this.setState(
      {
        groups: newGroupCount,
        fields: newFieldsCount,
      },
      () => {
        this.update();
        if (this.state.groups < 1) {
          this.addGroup();
        }
      },
    );
  };

  addConstraints = (groupId: string, fieldId: string) => {
    const newConstraint = createNewConstraint();
    if (!this.groups[groupId].fields[fieldId].constraints) {
      this.groups[groupId].fields[fieldId].constraints = {};
      this.groups[groupId].fields[fieldId].constraints[newConstraint._id] = newConstraint;
      this.forceUpdate();
    } else {
      this.groups[groupId].fields[fieldId].constraints[newConstraint._id] = newConstraint;
    }
    this.forceUpdate();
    this.update();
  };

  componentWillMount() {
    const localStorageGroup = JSON.parse(localStorage.getItem("store"));
    if (localStorageGroup && localStorageGroup.groupCount >= 1) {
      this.groups = localStorageGroup.groups;
      this.setState({
        groups: localStorageGroup.groupCount,
        fields: localStorageGroup.fieldsCount,
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
        <div class="subheader">
          <div class="container">
            <h1>New Fields File</h1>
            <div class="button-nav">
              <Button text="Reset Form" buttonClass="text-danger" clickHandler={this.resetForm} />
              <Button text="Preview" buttonClass="primary" clickHandler={this.togglePreviewPane} />
            </div>
          </div>
        </div>

        <div class="container">
          {/* Grouped Fields */}
          <div class="group-box">
            <div class="group-header">
              <h3>Groups</h3>
            </div>
            <div class="group-body">
              {Object.keys(this.groups).length < 1 && (
                <div class="emptyGroup">
                  <h3>-</h3>
                </div>
              )}
              {Object.keys(this.groups).length >= 1 &&
                Object.keys(this.groups).map(groupId => (
                  <InputGroup
                    key={groupId}
                    group={this.groups[groupId]}
                    deleteGroup={this.deleteGroup}
                    addField={this.addField}
                    deleteField={this.deleteField}
                    saveGroup={this.updateGroup}
                    addConstraints={this.addConstraints}
                  />
                ))}
            </div>
          </div>
          <Button text="Add Group" buttonClass="primary-large" clickHandler={this.addGroup} />
          <pre class="line-numbers">
            <code id="code-block" class="language-js" />
          </pre>
        </div>
        {this.state.showPreview && <PreviewPane groups={this.groups} handleClose={this.togglePreviewPane} />}
      </div>
    );
  }
}
