import { h, render } from "preact";
import App from "./components/app";
import "./style";

export default App;

declare const module: any;

// const mountNode = document.getElementById("app") as Element;
render(<App />, document.body);

// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
