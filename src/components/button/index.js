import { h } from 'preact';
// import { Link } from 'preact-router/match';
import style from './style';

const Button = ({ text, buttonClass, clickHandler, children }) => (
  <button className={style[buttonClass]} onClick={clickHandler}>
    { children }
    {text}
  </button>
);

export default Button;