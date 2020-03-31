import { h, Component } from "preact";
import linkState from "linkstate";

import Button from "../../../button";
import "./style";
import { Value, ValueProps } from "../../../../interfaces";
// import { getRandomId } from '../../../../../../utils';

export default class Values extends Component<ValueProps, Value> {
  constructor(props) {
    super(props);
    this.state = { ...this.props.value };
    // this.deleteValue = this.deleteValue.bind(this);
  }

  deleteValue() {
    this.props.deleteValue(this.state._id);
  }

  updateValueIfTypeChanges(): Value {
    if (this.props.fieldType === "Number") {
      return Object.assign({ value: Number(this.state.value) }, this.state);
    } else {
      return this.state;
    }
  }

  componentDidUpdate() {
    this.props.saveValue(this.state._id, this.updateValueIfTypeChanges());
  }

  render({ className, fieldType }) {
    return (
      <div>
        <input
          class={className}
          type="text"
          placeholder="Label"
          value={this.state.label}
          onChange={linkState(this, "label")}
        />
        {fieldType === "String" && (
          <input
            class={className}
            type="text"
            placeholder="Value"
            value={this.state.value}
            onChange={linkState(this, "value")}
          />
        )}
        {fieldType === "Number" && (
          <input
            class={className}
            type="number"
            placeholder="Value"
            value={this.state.value}
            onChange={linkState(this, "value")}
          />
        )}
        <Button text="Delete" buttonClass="text-inline" clickHandler={this.deleteValue} />
      </div>
    );
  }
}
