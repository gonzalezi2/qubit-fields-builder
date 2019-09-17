import { h } from 'preact';
import InputGroup from '.';
import InputField from './components/input-field';
import { shallow, render, mount } from 'enzyme';

describe('Input Group', () => {
	it('should render without any errors and with no input fields', () => {
		const props ={
			group: {
				fields: {}
			}
		}
		const component = shallow(<InputGroup {...props}  />);
		const inputFields =component.find(InputField);
		expect(component.length).toBe(1);
		expect(inputFields.length).toBe(0);
	});
	it('should trigger the addField prop method when the user clicks on the add input button', () => {
		const props ={
			group: {
				_id: 'dgldfjl845514d',
				id: 'group-title',
				title: '',
				subtitle: '',
				fields: {}
			},
			addField: jest.fn(),
			saveGroup: jest.fn()
		}
		const component = mount(<InputGroup {...props}  />);

		const addInput = component.find('button').at(1);
		addInput.simulate('click');

		expect(props.addField).toHaveBeenCalled();
		component.unmount();
	});

	it('should render with 1 child input field component', () => {
		const props ={
			group: {
				_id: 'dgldfjl845514d',
				id: 'group-title',
				title: '',
				subtitle: '',
				fields: {
					d6d6d15c1fv5: {
						_id: 'd6d6d15c1fv5',
						_groupId: 'dgldfjl845514d',
						key: '',
						type: 'String',
						label: '',
						groupId: 'group-title',
						footnote: '',
						required: false,
						description: ''
					}
				}
			},
			addField: jest.fn(),
			saveGroup: jest.fn()
		}
		const component = mount(<InputGroup {...props}  />);
		const inputFields = component.find(InputField);

    expect(inputFields.length).toBe(1);
		component.unmount();
	});
});