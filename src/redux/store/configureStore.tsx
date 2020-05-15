import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import loggerMiddleware from "../middleware/logger";
import FieldReducer from "../reducers/field-reducers";

const configureStore = preloadedState => {
  const middlewares = [loggerMiddleware];
  const middlewarerEnhancers = applyMiddleware(...middlewares);

  const enhancers = [middlewarerEnhancers];
  const composedEnhancer = composeWithDevTools(...enhancers);

  const store = createStore(FieldReducer, preloadedState, composedEnhancer);
  return store;
};

export default configureStore;
