import { h } from "preact";
import InputGroup from ".";
import InputField from "./input-field";
import { shallow, mount } from "enzyme";
import { Group, GroupProps } from "../../interfaces";

describe("Input Group", () => {
  const group: Group = {
    _id: "dgldfjl845514d",
    id: "group-title",
    title: "",
    subtitle: "",
    fields: {
      d6d6d15c1fv5: {
        _id: "d6d6d15c1fv5",
        _groupId: "dgldfjl845514d",
        key: "",
        type: "String",
        label: "",
        groupId: "group-title",
        footnote: "",
        required: false,
        description: "",
        constraints: {},
      },
    },
  };
  const props: GroupProps = {
    saveGroup: jest.fn(),
    deleteGroup: jest.fn(),
    addField: jest.fn(),
    group: group,
    key: "",
    deleteField: jest.fn(),
    addConstraints: jest.fn(),
  };
  it("should render without any errors, with one input fields, and the right state", () => {
    const component = shallow(<InputGroup {...props} />);
    const inputFields = component.find(InputField);
    expect(component.length).toBe(1);
    expect(inputFields.length).toBe(1);
    expect(component.instance().state).toEqual(group);
  });

  it("should render a component with inputs with empty or given values", () => {
    const component = mount(<InputGroup {...props} />);
    const inputs = component.find("input");
    expect(inputs.at(0).props().value).toBe("group-title");
    expect(inputs.at(1).props().value).toBe("");
    expect(inputs.at(2).props().value).toBe("");
  });

  it("should update the component inputs with new values", () => {
    const component = shallow(<InputGroup {...props} />);
    component.instance().shouldComponentUpdate = () => true;

    const inputs = component.find("input");
    inputs
      .at(0)
      .props()
      .onChange("this is the id value");
    inputs
      .at(1)
      .props()
      .onChange("this is the title value");
    inputs
      .at(2)
      .props()
      .onChange("this is the subtitle value");

    expect(component.state("_id")).toBe("dgldfjl845514d");
    expect(component.state("id")).toBe("this is the id value");
    expect(component.state("title")).toBe("this is the title value");
    expect(component.state("subtitle")).toBe("this is the subtitle value");

    expect(props.saveGroup).toBeCalledWith(component.state());
  });

  it("should render with 1 child input field component", () => {
    const component = mount(<InputGroup {...props} />);
    const inputFields = component.find(InputField);

    expect(inputFields.length).toBe(1);
    component.unmount();
  });

  it("should trigger the addField prop method when the user clicks on the add input button", () => {
    const component = mount(<InputGroup {...props} />);

    const addInput = component.find("button").at(1);
    addInput.simulate("click");

    expect(props.addField).toHaveBeenCalled();
    component.unmount();
  });

  it("should unmount/delete the component when clicking on the delete input button", () => {
    const component = mount(<InputGroup {...props} />);
    component.instance().deleteGroup = props.deleteGroup;
    component.instance().forceUpdate();
    const deleteButton = component.find("button").at(0);
    deleteButton.props().onClick();

    expect(props.deleteGroup).toHaveBeenCalled();
    component.unmount();
  });
});
