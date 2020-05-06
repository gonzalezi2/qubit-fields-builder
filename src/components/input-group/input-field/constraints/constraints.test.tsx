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

  it("should update an exisiting value when given new data", () => {
    const props: ConstraintProps = {
      constraint: {
        _id: "d54g1w56f",
        type: "values",
        value: {},
      },
      key: "",
      type: "String",
      saveConstraint: jest.fn(),
      deleteConstraint: jest.fn(),
    };
    const component = shallow(<Constraint {...props} />);
    component.instance().addValue();
    const state = component.state();
    const valueKeys = Object.keys(state.value);
    const valueId = valueKeys[0];
    const newValue = {
      _id: valueId,
      label: "Second Label",
      value: "Second Value",
    };
    component.instance().saveValue(valueId, newValue);
    expect(valueKeys).toHaveLength(1);

    const updatedValue = state.value[valueId];
    expect(updatedValue._id).toHaveLength(9);
    expect(updatedValue._id).toBe(valueId);
    expect(updatedValue.label).toBe("Second Label");
    expect(updatedValue.value).toBe("Second Value");
  });
  it("should delete an exisiting value from the values object", () => {
    const props: ConstraintProps = {
      constraint: {
        _id: "d54g1w56f",
        type: "values",
        value: {
          tvdx951dr: {
            _id: "tvdx951dr",
            label: "Second Label",
            value: "Second Value",
          },
        },
      },
      key: "",
      type: "String",
      saveConstraint: jest.fn(),
      deleteConstraint: jest.fn(),
    };
    const component = shallow(<Constraint {...props} />);
    const state = component.state();
    const currentValueKeys = Object.keys(state.value);
    const valueId = currentValueKeys[0];
    expect(currentValueKeys).toHaveLength(1);
    component.instance().deleteValue(valueId);
    const newValueKeys = Object.keys(state.value);
    expect(newValueKeys).toHaveLength(0);
  });
});
