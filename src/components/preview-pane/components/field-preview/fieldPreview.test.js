import { h } from 'preact';
import FieldPreview from '.';
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
					description: ''
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
					description: 'This should render a description'
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
});