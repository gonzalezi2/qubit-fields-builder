/* eslint-disable indent */
import { h, Component } from "preact";
import { connect } from "react-redux";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";

import Header from "./header";
import PreviewPane from "./preview-pane";
import Button from "./button";
import GroupsContainer from "../containers/groups";
import { createNewField, createJSONCode, updateGroupId, createNewConstraint } from "../utils";
import { Group } from "src/interfaces";
import { ADD_GROUP } from "../store/actions";

type State = {
  showPreview: boolean;
};

type Props = {
  onAddGroup: () => void;
};

class App extends Component<Props, State> {
  state = {
    showPreview: false,
  };

  groups = {};
  json = {
    groups: [],
    fields: [],
  };

  handlePreviewToggle = () => {
    this.setState({ showPreview: !this.state.showPreview });
    document.body.classList.toggle("no-scroll");
  };

  updateCodePreview() {
    this.json = createJSONCode(this.groups);
    document.querySelector("#code-block").innerHTML = JSON.stringify(this.json, undefined, 2);
    setTimeout(() => Prism.highlightAll(), 0);
  }

  handleResetForm = () => {
    this.groups = {};
    this.json = {
      groups: [],
      fields: [],
    };
    this.setState(
      {
        // eslint-disable-next-line indent
        showPreview: false,
      },
      () => {
        this.props.onAddGroup();
      },
    );
  };

  // update = () => {
  //   updateLocalStorage(this.groups, this.state);
  //   this.updateCodePreview();
  // };

  addField = (groupId: string, groupKey: string) => {
    const newField = createNewField(groupId, groupKey);
    // state.fields.groups[groupId].fields = newGroup;
    this.groups[groupId].fields[newField._id] = newField;
    // return state.fields.fields.push(newField);

    // this.setState({ fields: this.state.fields + 1 }, this.update);
  };

  deleteField = (groupId: string, fieldId: string) => {
    delete this.groups[groupId].fields[fieldId];
    // this.setState({ fields: this.state.fields - 1 });
    this.updateGroup(this.groups[groupId]);
  };

  updateGroup = (group: Group) => {
    // Loop through the updated group's fields to check for a change in the group id
    this.groups[group._id] = updateGroupId(group);
    // this.update();
  };

  deleteGroup = (groupId: string) => {
    // const fieldsToDelete = Object.keys(this.groups[groupId].fields).length;
    delete this.groups[groupId];

    // const newGroupCount = this.state.groups - 1;
    // const newFieldsCount = this.state.fields - fieldsToDelete;

    // this.setState(
    //   {
    //     groups: newGroupCount,
    //     fields: newFieldsCount,
    //   },
    //   () => {
    //     this.update();
    //     if (this.state.groups < 1) {
    //       this.addGroup();
    //     }
    //   },
    // );
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
    // this.update();
  };

  componentWillMount() {
    const localStorageGroup = JSON.parse(localStorage.getItem("store"));
    if (localStorageGroup /* && localStorageGroup.groupCount >= 1 */) {
      this.groups = localStorageGroup.groups;
      // this.setState({
      //   groups: localStorageGroup.groupCount,
      //   fields: localStorageGroup.fieldsCount,
      // });
    }
  }

  componentDidMount() {
    if (Object.keys(this.groups).length === 0) {
      this.props.onAddGroup();
    }
    // this.update();
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div class="subheader">
          <div class="container">
            <h1>New Fields File</h1>
            <div class="button-nav">
              <Button text="Reset Form" buttonClass="text-danger" onClickEvent={this.handleResetForm} />
              <Button text="Preview" buttonClass="primary" onClickEvent={this.handlePreviewToggle} />
            </div>
          </div>
        </div>

        <div class="container">
          <GroupsContainer />
          <Button text="Add Group" buttonClass="primary-large" onClickEvent={this.props.onAddGroup} />
          <pre class="line-numbers">
            <code id="code-block" class="language-js" />
          </pre>
        </div>
        {this.state.showPreview && <PreviewPane groups={this.groups} onClose={this.handlePreviewToggle} />}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddGroup: () => dispatch({ type: ADD_GROUP }),
  };
};

export default connect(null, mapDispatchToProps)(App);
