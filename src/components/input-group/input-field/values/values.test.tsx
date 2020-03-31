import { h } from "preact";
import Values from "../values";
// import Button from '../../../button';
import { shallow } from "enzyme";
import { ValueProps } from "../../../../interfaces";

describe("Constraint", () => {
  const props: ValueProps = {
    value: {
      _id: "string",
      label: "string",
      value: "string",
    },
    deleteValue: jest.fn(),
    saveValue: jest.fn(),
    fieldType: "String",
    className: "string",
  };
  it("should render the component without any errors", () => {
    const component = shallow(<Values {...props} />);
    expect(component.length).toBe(1);
  });
});
