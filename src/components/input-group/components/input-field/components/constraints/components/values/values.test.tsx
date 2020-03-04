import { h } from "preact";
import Values from "../values";
// import Button from '../../../button';
import { shallow, render, mount } from "enzyme";

describe("Constraint", () => {
  it("should render the component without any errors", () => {
    const component = shallow(<Values />);
    expect(component.length).toBe(1);
  });
});
