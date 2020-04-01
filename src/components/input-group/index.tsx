import { h, Component } from "preact";
import linkState from "linkstate";
import "./style.scss";

import Button from "../button";
import InputField from "./input-field";
import { Group, GroupProps, Constraint, Field } from "../../interfaces";

export default class InputGroup extends Component<GroupProps, Group> {
  saveField = (fieldID: string, field: Field) => {
    this.setState(state => {
      // Checks to see if the field exists before trying to apply a change
      // Prevents an error from occurring when deleting a field
      if (this.state.fields[fieldID]) {
        Object.assign(state.fields[fieldID], field);
      }
    });
    this.props.saveGroup(this.state);
  };

  saveConstraint = (fieldID: string, constraintID: string, constraint: Constraint) => {
    this.setState(state => {
      if (this.state.fields[fieldID].constraints[constraintID]) {
        Object.assign(state.fields[fieldID].constraints[constraintID], constraint);
      }
    });
    this.props.saveGroup(this.state);
  };

  deleteConstraint = (fieldID: string, constraintID: string) => {
    const newState = Object.assign({}, this.state);
    delete newState.fields[fieldID].constraints[constraintID];
    this.props.saveGroup(newState);
    this.forceUpdate();
  };

  addField = () => {
    this.props.addField(this.state._id, this.state.id);
  };

  deleteGroup = () => {
    this.props.deleteGroup(this.state._id);
  };

  constructor(props: GroupProps) {
    super(props);
    this.state = { ...this.props.group };
  }

  componentDidUpdate() {
    this.props.saveGroup(this.state);
  }

  render({ group }) {
    return (
      <div class="group-block">
        <div class="group">
          <h4>Group</h4>
          <input name="id" type="text" value={this.state.id} onChange={linkState(this, "id")} placeholder="Group Id" />
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={linkState(this, "title")}
            placeholder="Group Title"
          />
          <input
            name="subtitle"
            type="text"
            value={this.state.subtitle}
            onChange={linkState(this, "subtitle")}
            placeholder="Group Subtitle"
          />
          <div class="footer">
            <Button text="Delete Group" buttonClass="text-danger" clickHandler={this.deleteGroup} />
            <Button text="Add Input" buttonClass="text" clickHandler={this.addField} />
          </div>
        </div>
        <div class="field">
          <h4>Input Fields</h4>
          <div class="fields">
            {Object.keys(group.fields).length < 1 && <h3>-</h3>}
            {Object.keys(group.fields).length > 0 &&
              Object.keys(group.fields).map(fieldId => (
                <InputField
                  key={fieldId}
                  field={group.fields[fieldId]}
                  saveField={this.saveField}
                  deleteField={this.props.deleteField}
                  addConstraints={this.props.addConstraints}
                  saveConstraint={this.saveConstraint}
                  deleteConstraint={this.deleteConstraint}
                />
              ))}
          </div>
        </div>
      </div>
    );
  }
}
