import { h } from "preact";
// import { Link } from 'preact-router/match';
import "./style.scss";

const Header = () => (
  <header class="header">
    <div class="container">
      <h2>Qubit Fields Builder</h2>
      <nav>
        {/* <Link activeClassName={style.active} href="/">Home</Link>
        <Link activeClassName={style.active} href="/profile">Me</Link>
        <Link activeClassName={style.active} href="/profile/john">John</Link> */}
      </nav>
    </div>
  </header>
);

export default Header;
