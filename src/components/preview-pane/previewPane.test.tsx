import { h } from "preact";
import FieldPreview from "./components/field-preview";
import PreviewPane from ".";
import { shallow } from "enzyme";

describe("Preview Pane", () => {
  it("should render with the right elements and without any errors", () => {
    const props = {
      groups: {},
    };
    const component = shallow(<PreviewPane {...props} />);
    const header = component.find("h3");
    const svgCloseIcon = component.find("svg.closeIcon");

    expect(component.length).toBe(1);
    expect(svgCloseIcon.length).toBe(1);
    expect(header.text()).toBe("Edit experience content");
  });

  it("should render 2 field-preview components when there are two groups", () => {
    const props = {
      groups: {
        df64d5f4d: {},
        df1d181dc: {},
      },
    };
    const component = shallow(<PreviewPane {...props} />);
    const fieldPreview = component.find(FieldPreview);

    expect(fieldPreview.length).toBe(2);
  });
});
