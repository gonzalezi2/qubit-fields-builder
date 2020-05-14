import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import loggerMiddleware from "../middleware/logger";

const configureStore = preloadedState => {
  const middlewares = [loggerMiddleware];
  const middlewarerEnhancers = applyMiddleware(...middlewares);

  const enhancers = [middlewarerEnhancers];
  const composedEnhancer = composeWithDevTools(...enhancers);

  const store = createStore(combinedReducers, preloadedState, composedEnhancer);
  return store;
};

export default configureStore;
