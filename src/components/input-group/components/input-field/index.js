import { h, Component } from 'preact';
// import { Link } from 'preact-router/match';
import style from './style';

export default class InputField extends Component {
  state = {
    type: 'String'
  };

  types = [
    'String', 'StringArray', 'Image', 'URL', 'Number', 'Boolean', 'TimeRange', 'Duration'
  ];

  render() {
    return (
      <div class={style.inputField}>
        <span>Input Title</span>
        <input type="text" />
        <div className="footnote">This is the footnote that should not show</div>
        <p class={style.inputDescription}>Description text</p>
      </div>
    );
  }
}