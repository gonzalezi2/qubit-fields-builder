import { v4 as uuidv4 } from "uuid";

import * as actionTypes from "../actions";

const initialState = [];

const FieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_FIELD:
      // return {
      //   ...state,
      //   field: {
      //     ...action.value,
      //   },
      // };
      return state;
    case actionTypes.UPDATE_FIELD:
      // return state.map(expense => {
      //   if(expense.id === action.id) {
      //     return {
      //       ...expense,
      //       ...action.updates
      //     }
      //   } else {
      //     return expense;
      //   }
      // });
      // return {
      //   ...state,
      // };
      return state;
    case actionTypes.DELETE_FIELD:
      return state;
    default:
      return state;
  }
};

export default FieldReducer;
