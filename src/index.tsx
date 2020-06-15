import { h, render } from "preact";
import { Provider } from "react-redux";

import App from "./components/app";
import createStore from "./store";
import "./style";

// export default App;
const store = createStore({ groups: [], fields: [], constraints: [] });
store.subscribe(() => {
  console.info(store.getState());
});

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
