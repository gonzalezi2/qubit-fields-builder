import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import loggerMiddleware from "./middleware/logger";
import FieldReducer from "./reducers/field";
import GroupReducer from "./reducers/group";
import ConstraintRedudcer from "./reducers/constraint";

const store = preloadedState => {
  console.info(preloadedState);
  const rootReducer = combineReducers({
    fields: FieldReducer,
    groups: GroupReducer,
    constraints: ConstraintRedudcer,
  });

  const middlewares = [loggerMiddleware];
  const middlewarerEnhancers = applyMiddleware(...middlewares);

  const enhancers = [middlewarerEnhancers];
  const composedEnhancer = composeWithDevTools(...enhancers);

  return createStore(rootReducer, preloadedState, composedEnhancer);
};

export default store;
