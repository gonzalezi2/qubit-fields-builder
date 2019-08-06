import { h, Component } from 'preact';
import style from './style';

import Button from '../button';
import InputField from './components/input-field';

export default class InputGroup extends Component {

  sendData = () => {
    this.props.parentCallback('Hey Popsie, How’s it going?');
  }

  render({ group, clickHandler, state }) {
	  return (
      <div class={style.inputGroup}>
        <h4>Group</h4>
        <input type="text" value={group.id} placeholder="Group Id" />
        <input type="text" value={group.title} placeholder="Group Title" />
        <input type="text" value={group.subtitle} placeholder="Group Subtitle" />

        <h4>Input Fields</h4>

        <button onClick={this.sendData}>Send Data</button>

        {/* {
          this.state.fields.fields.forEach((group) => {
            return <InputField group={group} clickHandler={this.addInput} />;
          })};
        } */}

        <Button text="Add Input" buttonClass="text" clickHandler={clickHandler} />
      </div>
    );
  }
}


// const InputGroup = ({ group, clickHandler, state }) => (

//   <div class={style.inputGroup}>
//     <h4>Group</h4>
//     <input type="text" value={group.id} placeholder="Group Id" />
//     <input type="text" value={group.title} placeholder="Group Title" />
//     <input type="text" value={group.subtitle} placeholder="Group Subtitle" />

//     {console.log(state)}
//     <h4>Input Fields</h4>

//     {/* {
//       this.state.fields.fields.forEach((group) => {
//         return <InputField group={group} clickHandler={this.addInput} />;
//       })};
//     } */}

//     <Button text="Add Input" buttonClass="text" clickHandler={clickHandler} />
//   </div>
// );

// export default InputGroup;