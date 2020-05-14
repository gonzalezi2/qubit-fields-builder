import { h, render } from "preact";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/app";
import "./style";

export default App;

const store = createStore();

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
