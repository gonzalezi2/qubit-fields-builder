import { h } from 'preact';
import InputField from '../input-field';
import { shallow, render, mount } from 'enzyme';

describe('Input Field', () => {
  it('should render a button without any errors', () => {
    const component = shallow(<InputField />);
    expect(component.length).toBe(1);
  });

  it('should render an input field for the key property with an empty value', () => {
		const onChange = jest.fn();
		const changeEvent = {
			target: { value: 'thisisthenewkey' }
		};
    const props = {
			key: 'd6f4d51df5',
			field: {
				key: '',
			}
		}
		const component = mount(<InputField {...props} />);
		expect(component.find('input').at(0).props().value).toBe('');

		component.find('input').at(0).simulate('change', changeEvent);
		expect(component.find('input').at(0).props().value).toBe('thisisthenewkey');


		component.unmount();
	});
	
  // it('should change the value of the key field on input change', () => {
  //   const props = {
	// 		key: 'd6f4d51df5',
	// 		field: {
	// 			_id: 'd6f4d51df5',
	// 			_groupId: '185fddfc1s8fe',
	// 			key: 'thisisthenewkey',
	// 			type: 'String',
	// 			label: '',
	// 			groupId: 'test-group-id',
	// 			footnote: '',
	// 			required: false,
	// 			description: ''
	// 		},
	// 		onChange: () => jest.fn()
	// 	}
	// 	const event = {
	// 		target: { value: 'thisisthenewkey' }
	// 	};
	// 	const component = mount(<InputField {...props} />);
	// 	const keyInput = component.find('input').at(0);
	// 	keyInput.simulate('change');
	// 	expect(props.onChange).toHaveBeenCalledWith('thisisthenewkey');
	// 	component.unmount();
  // });

  // it('should render a button with a passed in click handler', () => {
  //   const mockClickHandler = jest.fn();
  //   const component = shallow(<Button clickHandler={mockClickHandler}>Click Me</Button>);

  //   component.find('button').simulate('click');
  //   expect(mockClickHandler).toHaveBeenCalled();
  // });
});
