import { h } from "preact";
// import { Link } from 'preact-router/match';
import "./style";
import { ButtonProps } from "../../interfaces";

const Button = ({ text, buttonClass, onClickEvent, children }: ButtonProps) => (
  <button className={buttonClass} onClick={onClickEvent}>
    {children}
    {text}
  </button>
);

export default Button;
