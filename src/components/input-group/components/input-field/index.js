import { h, Component } from 'preact';
import linkState from 'linkstate';
import Button from '../../../button';
import style from './style';

export default class InputField extends Component {
  deleteField = () => {
    this.props.deleteField(this.props.field._groupId, this.props.field._id);
  }

  constructor(props) {
    super(props);

    this.state = { ...this.props.field };
    this.types = [
      'String', 'StringArray', 'Image', 'URL', 'Number', 'Boolean', 'TimeRange', 'Duration'
    ];
  }

  componentDidUpdate() {
    this.props.saveField(this.state._id, this.state);
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

        <Button text="Delete Input" buttonClass="text" clickHandler={this.deleteField} />
      </div>
    );
  }
}