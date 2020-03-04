import { h } from 'preact';
import FieldPreview from '.';
import Button from '../../../button';
import { shallow, render, mount } from 'enzyme';

describe('Input Group', () => {
	it('should render without any errors', () => {
		const group = {
			_id: 'dgldfjl845514d',
			id: 'group-title',
			title: 'This is the group',
			subtitle: 'This is the subtitle',
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
					description: '',
					constraints: {}
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		expect(component.length).toBe(1);
	});

	it('should render with the proper props', () => {
		const group = {
			_id: 'dgldfjl845514d',
			id: 'group-title',
			title: 'This is the group',
			subtitle: 'This is the subtitle',
			fields: {
				d6d6d15c1fv5: {
					_id: 'd6d6d15c1fv5',
					_groupId: 'dgldfjl845514d',
					key: 'This is the key',
					type: 'String',
					label: 'This should render a label',
					groupId: 'group-title',
					footnote: 'This should render a footnote',
					required: false,
					description: 'This should render a description',
					constraints: {}
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const toolTopContainer = component.findWhere(element => element.hasClass('tooltipContainer'));
		const footnote = component.findWhere(element => element.hasClass('footnote'));

		expect(toolTopContainer.length).toBe(1);
		expect(footnote.length).toBe(1);
	});

	it('should render a text input when the field type is String', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'String',
					constraints: {}
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const input = component.find('input[type="text"]');

		expect(input.length).toBe(1);
	});

	it('should render a checkbox input when the field type is Boolean', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'Boolean',
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const input = component.find('input[type="checkbox"]');

		expect(input.length).toBe(1);
	});

	it('should render a button with the text Add Image when the field type is Image', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'Image',
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const imageButton = component.find(Button);

		expect(imageButton.prop('text')).toBe('Add Image');
	});

	it('should render a number input when the field type is Number', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'Number',
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const input = component.find('input[type="number"]');

		expect(input.length).toBe(1);
	});

	it('should render a url input when the field type is URL', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'URL',
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const input = component.find('input[type="url"]');

		expect(input.length).toBe(1);
	});

	it('should render a button with the text when the field type is StringArray', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'StringArray',
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const stringArrayContainer = component.find('div.stringArrayInput');
		const stringArrayButton = component.find(Button);

		expect(stringArrayContainer.length).toBe(1);
		expect(stringArrayButton.prop('text')).toBe('One more option');
	});

	it('should render two "inputs" when the field type is TimeRange', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'TimeRange',
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const inputContainer = component.find('div.timeRangeInputs');
		const inputDivs = component.find('div.textInputDiv');
		const rangeInput = component.find('span.timeRange');
		const clockSVG = component.find('svg.icon');
		const digitInput = component.find('span.digitInput');

		expect(inputContainer.length).toBe(1);
		expect(inputDivs.length).toBe(2);
		expect(rangeInput.length).toBe(2);
		expect(clockSVG.length).toBe(2);
		expect(digitInput.length).toBe(6);
	});

	it('should render a number input and a select dropdown when the field type is Duration', () => {
		const group = {
			fields: {
				d6d6d15c1fv5: {
					type: 'Duration',
				}
			}
		}
		const props = {
			group
		}
		const component = shallow(<FieldPreview {...props} />);
		const numInput = component.find('input[type="number"]');
		const select = component.find('select');
		const option = component.find('option');

		expect(numInput.length).toBe(1);
		expect(select.length).toBe(1);
		expect(option.length).toBe(4);
	});
});