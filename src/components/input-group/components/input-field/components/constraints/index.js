import { h, Component } from 'preact';
import linkState from 'linkstate';
import Button from '../../../../../button';
import style from './style';

export default class Constraint extends Component {

  constructor(props) {
    super(props);

    this.state = { ...this.props.constraint };
    this.types = [
      'String', 'Number', 'Duration'
    ];
  }

  componentDidUpdate() {
      this.props.saveConstraint(this.state._id, this.state);
  }

  render({ type, constraint }) {
    return (
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
        </div>
    );
  }
}