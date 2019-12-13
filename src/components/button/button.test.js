import { h } from 'preact';
import Button from '../button';
import { shallow } from 'enzyme';

describe('Button', () => {
  it('should render a button without any errors', () => {
    const component = shallow(<Button text="Button Text" />);
    expect(component.length).toBe(1);
  });

  it('should render a button with the correct text', () => {
    const component = shallow(<Button text="Button Text" />);
    expect(component.text()).toBe('Button Text');
  });

  it('should render a button with the correct class name', () => {
    const component = shallow(<Button buttonClass="primary" />);
    expect(component.find('button.primary').length).toBe(1);
  });

  it('should render a button with the correct child prop', () => {
    const component = shallow(<Button><span>Hello</span></Button>);
    expect(component.contains(<span>Hello</span>)).toBe(true);
  });

  it('should render a button with a passed in click handler', () => {
    const mockClickHandler = jest.fn();
    const component = shallow(<Button clickHandler={mockClickHandler}>Click Me</Button>);

    component.find('button').simulate('click');
    expect(mockClickHandler).toHaveBeenCalled();
  });
});
