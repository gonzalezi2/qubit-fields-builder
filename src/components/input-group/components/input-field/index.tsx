import { h, Component } from 'preact';
import linkState from 'linkstate';
import Button from '../../../button';
import style from './style';
import Constraint from './components/constraints';

export default class InputField extends Component {
  deleteField = () => {
    this.props.deleteField(this.props.field._groupId, this.props.field._id);
  }

  addConstraints = () => {
    this.props.addConstraints(this.state._groupId, this.state._id);
  }

  saveConstraint = (id, constraint) => {
    this.props.saveConstraint(this.state._id, id, constraint);
  }

  deleteConstraint = (constraintID) => {
    this.props.deleteConstraint(this.state._id, constraintID);
  }

  constructor(props) {
    super(props);

    this.state = { ...this.props.field };
    this.types = [
      'String', 'StringArray', 'Image', 'URL', 'Number', 'Boolean', 'TimeRange', 'Duration'
    ];
  }

  componentDidUpdate() {
    if(this.state.type !== 'String' && this.state.type !== 'Number' && this.state.type !== 'Duration' && Object.keys(this.state.constraints).length > 0) {
      let newState = Object.assign({}, this.state);
      newState.constraints = {};
      this.setState(newState);
      this.props.saveField(this.state._id, newState);
    } else {
      this.props.saveField(this.state._id, this.state);
    }
  }

  render({ field, saveField }) {
    return (
      <div class={style.inputField}>
        <input type="text" name="key" value={this.state.key} placeholder="Key" onChange={linkState(this, 'key')} />
        <input type="text" name="description" value={this.state.description} placeholder="Description" onChange={linkState(this, 'description')} />
        <input type="text" name="label" value={this.state.label} placeholder="Label" onChange={linkState(this, 'label')} />
        <input type="text" name="footnote" value={this.state.footnote} placeholder="Footnote" onChange={linkState(this, 'footnote')} />
        <label>
          <input type="checkbox" name="required" value={this.state.required} checked={this.state.required} onChange={linkState(this, 'required')} /> Required
        </label>
        <div className="select-wrapper">
          <select name="type"  value={this.state.type} onChange={linkState(this, 'type')}>
            <option value="">Please select a field type</option>
            {
              this.types.map(type => (
                <option value={type}>{type}</option>
              ))
            }
          </select>
        </div>
        { Object.keys(this.state.constraints).length > 0 && 
            <h5>Constraints</h5>
        }
        { Object.keys(this.state.constraints).map(constraint => (
          <Constraint key={constraint} constraint={this.state.constraints[constraint]} type={this.state.type} saveConstraint={this.saveConstraint} deleteConstraint={this.deleteConstraint}/>
        ))}
        <div class={style.footer}>
          <Button text="Delete Input" buttonClass="text-danger" clickHandler={this.deleteField} />
          {(
            this.state.type === 'String' ||
            this.state.type === 'Number' ||
            this.state.type === 'Duration'
            ) &&
            <Button text="Add Constraint" buttonClass="text" clickHandler={this.addConstraints} />}
        </div>
      </div>
    );
  }
}