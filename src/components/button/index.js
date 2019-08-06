import { h } from 'preact';
// import { Link } from 'preact-router/match';
import style from './style';

const Button = ({ text, buttonClass, clickHandler }) => (
  <button className={style[buttonClass]} onClick={clickHandler}>
    {text}
  </button>
);

export default Button;