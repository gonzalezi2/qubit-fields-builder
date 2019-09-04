import { h } from 'preact';
import App from './app';
import Header from './header';
import Button from './button';
import { shallow, mount, render } from 'enzyme';

describe('Initial Test of the App', () => {
  it('should contain a Header component"', () => {
    const component = shallow(<App />);
    expect(component.contains(<Header />)).toBe(true);
  });
});
