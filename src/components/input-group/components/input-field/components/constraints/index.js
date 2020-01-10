import { h, Component } from 'preact';
import linkState from 'linkstate';
import Button from '../../../../../button';
import style from './style';
import Values from './components/values';
import { createNewValue } from '../../../../../../utils';

export default class Constraint extends Component {

  constructor(props) {
    super(props);

    this.state = { ...this.props.constraint };
    this.types = [
      'String', 'Number', 'Duration'
    ];
  }

  deleteValue = (id) => {
    let newState = Object.assign({}, this.state);
    delete newState.value[id]
    this.setState(newState);
  }

  addValue = () => {
    let newState = Object.assign({}, this.state);
    if(typeof newState.value === 'number') {
      newState.value = {};
    }
    const newValue = createNewValue();
    newState.value[newValue._id] = newValue;
    this.setState(newState);
  }

  saveValue = (id, value) => {
    let newState = Object.assign({}, this.state);
    newState.value[id] = value;
    this.props.saveConstraint(this.state._id, newState);
  }

  deleteConstraint = () => {
    this.props.deleteConstraint(this.state._id);
  }

  componentDidUpdate() { 
    if(this.props.type !== 'Number' && this.props.type !== 'String' && this.state.type === 'values') {
      this.deleteConstraint();
    }
    if(this.state.type !== 'values' && typeof this.state.value === 'object') {
      let newState = Object.assign({}, this.state);
      newState.value = 0;
      this.props.saveConstraint(this.state._id, newState);
      this.setState(newState);
    } else if(this.state.type === 'values' && typeof this.state.value === 'string') {
      let newState = Object.assign({}, this.state);
      newState.value = [];
      this.props.saveConstraint(this.state._id, newState);
    } else {
      this.props.saveConstraint(this.state._id, this.state);
    }
  }

  render({ type }) {
    return (
      <div>
        <div class={style.inputGroup}>
            <div class={style.half +  " select-wrapper"}>
                <select name="type" value={this.state.type} onChange={linkState(this, 'type')}>
                    <option value="maxLength">Max Length</option>
                    <option value="minLength">Min Length</option>
                    { (type === 'String' || type === 'Number') && <option value="values">Values</option>}
                </select>
            </div>
            { this.state.type !== 'values' && <label class={style.quarter}><input type="number" value={this.state.value} onChange={linkState(this, 'value')}/></label>}
            <Button text="✖" buttonClass="input" clickHandler={this.deleteConstraint} />
            { this.state.type === 'values' &&
              <div class={style.values}>
                { Object.keys(this.state.value).length > 0 && Object.keys(this.state.value).map(id => (
                  <Values key={id} value={this.state.value[id]} fieldType={type} className={style.half} saveValue={this.saveValue} deleteValue={this.deleteValue} />
                )) }
                <Button text="Add Value" buttonClass="text" clickHandler={this.addValue} />
              </div>
            }
        </div>
      </div>
    );
  }
}