import { h } from "preact";
// import { Link } from 'preact-router/match';
import "./style";

interface ButtonProps {
  text: string;
  buttonClass: string;
  clickHandler: () => void;
  children?: string | h.JSX.Element;
}

const Button = ({ text, buttonClass, clickHandler, children }: ButtonProps) => (
  <button className={buttonClass} onClick={clickHandler}>
    {children}
    {text}
  </button>
);

export default Button;
