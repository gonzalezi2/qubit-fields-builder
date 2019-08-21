import { h, Component } from 'preact';
import linkState from 'linkstate';
import style from './style';

import Button from '../button';
import InputField from './components/input-field';

export default class InputGroup extends Component {

  sendData = () => {
    this.props.saveGroup(this.state);
  }

  saveField = (fieldID, field) => {
    this.setState(state => {
      // state.fields[fieldID];
      Object.assign(state.fields[fieldID], field);
    });
    this.sendData();
  }

  constructor(props) {
    super(props);
    this.state = { ...this.props.group };
  }
  componentDidMount() {
    console.info('we made it this far') ;
  }
  componentDidUpdate() {
    this.sendData();
  }

  componentDidCatch(error) {
    console.info(error);
  }

  render({ group, clickHandler }) {
	  return (
      <div class={style.inputGroup}>
        <h4>Group</h4>
        <input name="id" type="text" value={this.state.id} onChange={linkState(this, 'id')} placeholder="Group Id" />
        <input name="title" type="text" value={this.state.title} onChange={linkState(this, 'title')} placeholder="Group Title" />
        <input name="subtitle" type="text" value={this.state.subtitle} onChange={linkState(this, 'subtitle')} placeholder="Group Subtitle" />

        {/* <Button clickHandler={this.sendData} text="Save Group" buttonClass="secondary" /> */}

        <h4>Input Fields</h4>

        {
          Object.keys(group.fields).length < 1 && <h3>-</h3>
        }
        {
          Object.keys(group.fields).length >= 1 && Object.keys(group.fields).map(fieldId => (
            <InputField field={group.fields[fieldId]} saveField={this.saveField} clickHandler={this.addInput} />
          ))
        }

        <Button text="Add Input" buttonClass="text" clickHandler={clickHandler.bind(this, this.state._id, this.state.id)} />
      </div>
    );
  }
}