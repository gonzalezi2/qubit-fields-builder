import { h, Component } from 'preact';
import linkState from 'linkstate';
import style from './style';

import Button from '../button';
import InputField from './components/input-field';

export default class InputGroup extends Component {

	saveField = (fieldID, field) => {
		this.setState(state => {
			// Checks to see if the field exists before trying to apply a change
			// Prevents an error from occurring when deleting a field
			if (this.state.fields[fieldID]) {
				Object.assign(state.fields[fieldID], field);
			}
		});
		this.props.saveGroup(this.state);
	}

	saveConstraint = (fieldID, constraintID, constraint) => {
		this.setState(state => {
			if (this.state.fields[fieldID].constraints[constraintID]) {
				Object.assign(state.fields[fieldID].constraints[constraintID], constraint);
			}
		});
		this.props.saveGroup(this.state);
	}

	addField = () => {
		this.props.addField(this.state._id, this.state.id);
		this.forceUpdate();
	}

	deleteGroup = () => {
		this.props.deleteGroup(this.state._id);
	}

	constructor(props) {
		super(props);
		this.state = { ...this.props.group };
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.state !== nextState;
	}

	componentDidUpdate() {
		this.props.saveGroup(this.state);
	}

	render({ group }) {
		return (
			<div class={style.inputGroup}>
				<div class={style.group}>
					<h4>Group</h4>
					<input name="id" type="text" value={this.state.id} onChange={linkState(this, 'id')} placeholder="Group Id" />
					<input name="title" type="text" value={this.state.title} onChange={linkState(this, 'title')} placeholder="Group Title" />
					<input name="subtitle" type="text" value={this.state.subtitle} onChange={linkState(this, 'subtitle')} placeholder="Group Subtitle" />
					<div class={style.footer}>
						<Button text="Delete Group" buttonClass="text-danger" clickHandler={this.deleteGroup} />
						<Button text="Add Input" buttonClass="text" clickHandler={this.addField} />
					</div>
				</div>
				<div class={style.field}>
					<h4>Input Fields</h4>
					<div class={style.fields}>
						{
							Object.keys(group.fields).length < 1 && <h3>-</h3>
						}
						{
							Object.keys(group.fields).length >= 1 && Object.keys(group.fields).map(fieldId => (
								<InputField
									key={fieldId}
									field={group.fields[fieldId]}
									saveField={this.saveField}
									clickHandler={this.addField}
									deleteField={this.props.deleteField}
									addConstraints={this.props.addConstraints}
									saveConstraint={this.saveConstraint}
								/>
							))
						}
					</div>
				</div>

			</div>
		);
	}
}