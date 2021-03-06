import { h, Component } from "preact";
import linkState from "linkstate";

import Button from "../../../button";
import "./style";
import Values from "../values";
import { createNewValue } from "../../../../utils";
import { Constraint as IConstraint, ConstraintProps, Value } from "../../../../interfaces";

export default class Constraint extends Component<ConstraintProps, IConstraint> {
  types = ["String", "Number", "Duration"];

  constructor(props: ConstraintProps) {
    super(props);

    this.state = { ...this.props.constraint };
  }

  addValue = () => {
    const newStateValue = typeof this.state.value === "number" ? {} : this.state.value;
    const newState = Object.assign(this.state, { value: newStateValue });
    const newValue = createNewValue();

    newState.value[newValue._id] = newValue;
    this.setState(newState);
  };

  saveValue = (id: string, value: Value) => {
    const newState = Object.assign({}, this.state);
    newState.value[id] = value;
    this.props.saveConstraint(this.state._id, newState);
  };

  deleteValue = (id: string) => {
    const newState = Object.assign({}, this.state);
    delete newState.value[id];
    this.setState(newState);
  };

  deleteConstraint = () => {
    this.props.deleteConstraint(this.state._id);
  };

  updateConstraintWhenValueTypeChanges() {
    const { type, value } = this.state;

    let newValue: number | object;
    if (type !== "values" && typeof value === "object") {
      newValue = 0;
      // this.setState(newState);
      return Object.assign({ value: newValue }, this.state);
    } else if (type === "values" && typeof value === "string") {
      newValue = [];
      return Object.assign({ value: newValue }, this.state);
    }

    return this.state;
  }

  componentDidUpdate() {
    if (this.props.type !== "Number" && this.props.type !== "String" && this.state.type === "values") {
      this.deleteConstraint();
    }

    this.props.saveConstraint(this.state._id, this.updateConstraintWhenValueTypeChanges());
  }

  render({ type }) {
    return (
      <div>
        <div class="input-group">
          <div class="half select-wrapper">
            <select name="type" value={this.state.type} onChange={linkState(this, "type")}>
              <option value="maxLength">Max Length</option>
              <option value="minLength">Min Length</option>
              {(type === "String" || type === "Number") && <option value="values">Values</option>}
            </select>
          </div>
          {this.state.type !== "values" && (
            <label class="quarter">
              <input type="number" value={String(this.state.value)} onChange={linkState(this, "value")} />
            </label>
          )}
          <Button text="✖" buttonClass="input" clickHandler={this.deleteConstraint} />
          {this.state.type === "values" && (
            <div class="values">
              {Object.keys(this.state.value).length > 0 &&
                Object.keys(this.state.value).map(id => (
                  <Values
                    key={id}
                    value={this.state.value[id]}
                    fieldType={type}
                    className="half"
                    saveValue={this.saveValue}
                    deleteValue={this.deleteValue}
                  />
                ))}
              <Button text="Add Value" buttonClass="text" clickHandler={this.addValue} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
