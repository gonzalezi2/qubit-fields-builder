import { h, render } from "preact";
import { Provider } from "react-redux";

import App from "./components/app";
import configureStore from "./redux/store/configureStore";
import "./style";

export default App;

const store = configureStore;

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
