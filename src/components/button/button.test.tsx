import { h } from "preact";
import Button from "../button";
import { shallow } from "enzyme";
import { ButtonProps } from "../../interfaces";

const props: ButtonProps = {
  text: "Button Text",
  buttonClass: "primary",
  clickHandler: jest.fn(),
};

describe("Button", () => {
  it("should render a button without any errors", () => {
    const component = shallow(<Button {...props} />);
    expect(component.length).toBe(1);
  });

  it("should render a button with the correct text", () => {
    const component = shallow(<Button {...props} />);
    expect(component.text()).toBe("Button Text");
  });

  it("should render a button with the correct class name", () => {
    const component = shallow(<Button {...props} />);
    expect(component.find("button.primary").length).toBe(1);
  });

  it("should render a button with the correct child prop", () => {
    const component = shallow(
      <Button {...props}>
        <span>Hello</span>
      </Button>,
    );
    expect(component.contains(<span>Hello</span>)).toBe(true);
  });

  it("should render a button with a passed in click handler", () => {
    const component = shallow(<Button {...props}>Click Me</Button>);

    component.find("button").simulate("click");
    expect(props.clickHandler).toHaveBeenCalled();
  });
});
