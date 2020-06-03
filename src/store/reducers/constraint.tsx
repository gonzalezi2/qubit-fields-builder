import * as actionTypes from "../actions";
import { createNewConstraint } from "../../utils";

const initialState = [];

const ConstraintReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CONSTRAINT: {
      // const newConstraint = createNewConstraint();
      // return {
      //   ...state,
      //   constraints: state.constraints.concat(newConstraint),
      // };

      return state;
    }
    case actionTypes.UPDATE_CONSTRAINT:
      // return {
      //   ...state,
      //   constraint: {
      //     ...action.value,
      //   },
      // };
      return state;
    case actionTypes.DELETE_CONSTRAINT:
      return state;
    default:
      return state;
  }
};

export default ConstraintReducer;
