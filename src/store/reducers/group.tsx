import * as actionTypes from "../actions";
import { createNewGroup } from "../../utils";

const initialState = [];

const GroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_GROUP: {
      const newGroup = createNewGroup();
      return [...state, newGroup];
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
      return state.filter(({ _id }) => _id !== action.groupId);
    default:
      return state;
  }
};

export default GroupReducer;
