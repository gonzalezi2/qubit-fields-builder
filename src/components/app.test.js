import { h } from 'preact';
import App from './app';
import Header from './header';
// import Button from './button';
import { mount } from 'enzyme';

describe('Main App', () => {
  let component;
  beforeEach(() => {
    component = mount(<App />, { attachTo: document.body });
  });
  afterEach(() => {
    component.unmount();
  });
  it('should render the component without any errors', () => {
    expect(component.length).toBe(1);
  });

  it('should contain a Header component', () => {
    expect(component.contains(<Header />)).toBe(true);
  });
});
