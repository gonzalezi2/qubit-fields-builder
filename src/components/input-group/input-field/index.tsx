import { h, Component } from "preact";
import linkState from "linkstate";

import Button from "../../button";
import "./style";
import Constraint from "./constraints";
import { Field, FieldProps, Constraint as IConstraint } from "../../../interfaces";

export default class InputField extends Component<FieldProps, Field> {
  deleteField = () => {
    this.props.deleteField(this.props.field._groupId, this.props.field._id);
  };

  addConstraints = () => {
    this.props.addConstraints(this.state._groupId, this.state._id);
  };

  saveConstraint = (id: string, constraint: IConstraint) => {
    this.props.saveConstraint(this.state._id, id, constraint);
  };

  deleteConstraint = (constraintID: string) => {
    this.props.deleteConstraint(this.state._id, constraintID);
  };

  types: string[] = ["String", "StringArray", "Image", "URL", "Number", "Boolean", "TimeRange", "Duration"];

  constructor(props: FieldProps) {
    super(props);

    this.state = { ...this.props.field };
  }

  updateConstraintWhenTypeChanges() {
    const { type, constraints } = this.state;

    if (type !== "String" && type !== "Number" && type !== "Duration" && Object.keys(constraints).length > 0) {
      const newState = Object.assign({ constraint: {} }, this.state);
      // newState.constraints = {};
      this.setState(newState);
      return newState;
    }

    return this.state;
  }

  componentDidUpdate() {
    this.props.saveField(this.state._id, this.updateConstraintWhenTypeChanges());
  }

  render() {
    return (
      <div class="inputField">
        <input type="text" name="key" value={this.state.key} placeholder="Key" onChange={linkState(this, "key")} />
        <input
          type="text"
          name="description"
          value={this.state.description}
          placeholder="Description"
          onChange={linkState(this, "description")}
        />
        <input
          type="text"
          name="label"
          value={this.state.label}
          placeholder="Label"
          onChange={linkState(this, "label")}
        />
        <input
          type="text"
          name="footnote"
          value={this.state.footnote}
          placeholder="Footnote"
          onChange={linkState(this, "footnote")}
        />
        <label>
          <input type="checkbox" name="required" checked={this.state.required} onChange={linkState(this, "required")} />
          Required
        </label>
        <div className="select-wrapper">
          <select name="type" value={this.state.type} onChange={linkState(this, "type")}>
            <option value="">Please select a field type</option>
            {this.types.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {Object.keys(this.state.constraints).length > 0 && <h5>Constraints</h5>}
        {Object.keys(this.state.constraints).map(constraint => (
          <Constraint
            key={constraint}
            constraint={this.state.constraints[constraint]}
            type={this.state.type}
            saveConstraint={this.saveConstraint}
            deleteConstraint={this.deleteConstraint}
          />
        ))}
        <div class="footer">
          <Button text="Delete Input" buttonClass="text-danger" clickHandler={this.deleteField} />
          {(this.state.type === "String" || this.state.type === "Number" || this.state.type === "Duration") && (
            <Button text="Add Constraint" buttonClass="text" clickHandler={this.addConstraints} />
          )}
        </div>
      </div>
    );
  }
}
