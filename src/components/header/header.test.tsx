import { h } from "preact";
import Header from ".";
import { shallow } from "enzyme";

describe("Initial Test of the Header", () => {
  it('should have a heading with the words "Qubit Fields Builder"', () => {
    const context = shallow(<Header />);
    expect(context.find("h2").text()).toBe("Qubit Fields Builder");
  });
});
