import { h } from "preact";
import Constraint from "../constraints";
// import Button from '../../../button';
import { shallow } from "enzyme";
import { ConstraintProps } from "../../../../interfaces";

describe("Constraint", () => {
  it("should render the component without any errors", () => {
    const props: ConstraintProps = {
      constraint: {
        _id: "string",
        type: "minLength",
        value: 0,
      },
      key: "",
      type: "String",
      saveConstraint: jest.fn(),
      deleteConstraint: jest.fn(),
    };
    const component = shallow(<Constraint {...props} />);
    expect(component.length).toBe(1);
  });

  it("should add a value to the constraint and update the value type to be an object", () => {
    const props: ConstraintProps = {
      constraint: {
        _id: "string",
        type: "minLength",
        value: 0,
      },
      key: "",
      type: "String",
      saveConstraint: jest.fn(),
      deleteConstraint: jest.fn(),
    };
    const component = shallow(<Constraint {...props} />);
    const state = component.state();
    expect(state.value).toBe(0);
    component.instance().addValue();
    expect(typeof state.value).toBe("object");
    const valueKeys = Object.keys(state.value);
    expect(valueKeys).toHaveLength(1);
    expect(state.value[valueKeys[0]]._id).toHaveLength(9);
    expect(state.value[valueKeys[0]].label).toBe("");
    expect(state.value[valueKeys[0]].value).toBe("");
  });
});
