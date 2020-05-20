import { h, render } from "preact";
import { Provider } from "react-redux";

import App from "./components/app";
import store from "./store";
import "./style";

export default App;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body,
);

declare const module;
// Hot Module Replacement
if (module.hot) {
  module.hot.accept();
}
