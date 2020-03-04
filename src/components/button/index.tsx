import { h } from "preact";
// import { Link } from 'preact-router/match';
import "./style";

const Button = ({ text, buttonClass, clickHandler, children }) => (
  <button className={buttonClass} onClick={clickHandler}>
    {children}
    {text}
  </button>
);

export default Button;
