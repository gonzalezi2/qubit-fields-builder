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
      return state.map(group => {
        if (group._id === action.groupId) {
          return {
            ...group,
            ...action.group,
          };
        } else {
          return group;
        }
      });
    case actionTypes.DELETE_GROUP:
      return state.filter(({ _id }) => _id !== action.groupId);
    default:
      return state;
  }
};

export default GroupReducer;
