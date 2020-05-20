import * as actionTypes from "../actions";
import { createNewGroup } from "../../utils";

const initialState = {
  groups: [],
};

const GroupReducer = (state = initialState, action) => {
  console.info(action);
  switch (action.type) {
    case actionTypes.ADD_GROUP: {
      const newGroup = createNewGroup();
      return {
        ...state,
        groups: state.groups.concat(newGroup),
      };
    }
    case actionTypes.UPDATE_GROUP:
      return {
        ...state,
        group: {
          ...action.value,
        },
      };
    case actionTypes.DELETE_GROUP:
      return state;
    default:
      return state;
  }
};

export default GroupReducer;
