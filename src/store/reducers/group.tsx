import * as actionTypes from "../actions";
import { createNewGroup } from "../../utils";

const initialState = [];

const GroupReducer = (state = initialState, action) => {
  console.info("GroupReducer");
  console.info(state);
  switch (action.type) {
    case actionTypes.ADD_GROUP: {
      const newGroup = createNewGroup();
      return [...state, newGroup];
      // return state;
    }
    case actionTypes.UPDATE_GROUP:
      // return {
      //   ...state,
      //   group: {
      //     ...action.value,
      //   },
      // };
      return state;
    case actionTypes.DELETE_GROUP:
      return state;
    default:
      return state;
  }
};

export default GroupReducer;
