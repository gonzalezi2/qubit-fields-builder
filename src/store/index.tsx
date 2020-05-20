import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import loggerMiddleware from "./middleware/logger";
import FieldReducer from "./reducers/field";
import GroupReducer from "./reducers/group";
import ConstraintRedudcer from "./reducers/constraint";

const store = preloadedState => {
  const rootReducer = combineReducers({
    field: FieldReducer,
    group: GroupReducer,
    constraint: ConstraintRedudcer
  });

  const middlewares = [loggerMiddleware];
  const middlewarerEnhancers = applyMiddleware(...middlewares);

  const enhancers = [middlewarerEnhancers];
  const composedEnhancer = composeWithDevTools(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancer);
  return store;
};

export default store;
