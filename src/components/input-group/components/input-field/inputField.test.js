import { h } from 'preact';
import InputField from '../input-field';
import Button from '../../../button';
import { shallow, render, mount } from 'enzyme';

describe('Input Field', () => {
  it('should render the component without any errors', () => {
    const component = shallow(<InputField />);
    expect(component.length).toBe(1);
	});
	
  it('should render a component with 5 inputs and 1 select element', () => {
		const component = shallow(<InputField />);
		const inputs = component.find('input');
		const selects = component.find('select');

    expect(inputs.length).toBe(5);
    expect(selects.length).toBe(1);
	});
	
  it('should render a component with a delete button with the text Delete Input', () => {
		const component = shallow(<InputField />);
		const button = component.find(Button);
		
    expect(button.props().text).toBe('Delete Input');
  });

  it('should render a component with inputs with empty or given values', () => {
		const saveField = jest.fn();
    const props = {
			key: 'd6f4d51df5',
			field: {
				_id: 'd6f4d51df5',
				_groupId: '185fddfc1s8fe',
				key: '',
				type: 'String',
				label: '',
				groupId: 'test-group-id',
				footnote: '',
				required: false,
				description: ''
			},
			saveField
		}
		const component = mount(<InputField {...props} />);
		const inputs = component.find('input');
		expect(inputs.at(0).props().value).toBe('');
		expect(inputs.at(1).props().value).toBe('');
		expect(inputs.at(2).props().value).toBe('');
		expect(inputs.at(3).props().value).toBe('');
		expect(inputs.at(4).props().value).toBe(false);
		expect(component.find('select').at(0).props().value).toBe('String');
		expect(component.state('groupId')).toBe('test-group-id');
	});

  it('should update the component inputs with new values', () => {
		const saveField = jest.fn();
    const props = {
			key: 'd6f4d51df5',
			field: {
				_id: 'd6f4d51df5',
				_groupId: '185fddfc1s8fe',
				key: '',
				type: 'String',
				label: '',
				groupId: 'test-group-id',
				footnote: '',
				required: false,
				description: ''
			},
			saveField
		}
		const component = shallow(<InputField {...props} />);
		const inputs = component.find('input');

		inputs.at(0).props().onChange('thisisthenewkey');
		inputs.at(1).props().onChange('thisisthenewdescription');
		inputs.at(2).props().onChange('thisisthenewlabel');
		inputs.at(3).props().onChange('thisisthenewfootnote');
		inputs.at(4).props().onChange(true);
		component.find('select').at(0).props().onChange('Image');

		expect(component.state('key')).toBe('thisisthenewkey');
		expect(component.state('description')).toBe('thisisthenewdescription');
		expect(component.state('label')).toBe('thisisthenewlabel');
		expect(component.state('footnote')).toBe('thisisthenewfootnote');
		expect(component.state('required')).toBe(true);
		expect(component.state('type')).toBe('Image');

		expect(saveField).toBeCalledWith(props.field._id, component.state());
	});

	it('should unmount/delete the component when clicking on the delete input button', () => {
		const deleteField = jest.fn();
		const saveField = jest.fn();
    const props = {
			key: 'd6f4d51df5',
			field: {
				_id: 'd6f4d51df5',
				_groupId: '185fddfc1s8fe',
				key: '',
				type: 'String',
				label: '',
				groupId: 'test-group-id',
				footnote: '',
				required: false,
				description: ''
			},
			saveField,
			deleteField
		}
		const component = mount(<InputField {...props} />);
		component.instance().deleteField = deleteField;
		component.instance().forceUpdate();
		const deleteButton = component.find('button').at(0);
		deleteButton.props().onClick();

		expect(deleteField).toHaveBeenCalled();
		component.unmount();
	});
});
