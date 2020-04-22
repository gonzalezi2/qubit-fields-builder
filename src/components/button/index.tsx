import { h } from "preact";
// import { Link } from 'preact-router/match';
import "./style";
import { ButtonProps } from "../../interfaces";

const Button = ({ text, buttonClass, clickHandler, children }: ButtonProps) => (
  <button className={buttonClass} onClick={clickHandler}>
    {children}
    {text}
  </button>
);

export default Button;
