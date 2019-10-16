import { h } from 'preact';
import App from './app';
import Header from './header';
import Button from './button';
import { shallow, mount, render } from 'enzyme';

describe('Main App', () => {
  it('should render the component without any errors', () => {
    const component = shallow(<App />);
    expect(component.length).toBe(1);
  });

  it('should contain a Header component', () => {
    const component = shallow(<App />);
    expect(component.contains(<Header />)).toBe(true);
  });
});
