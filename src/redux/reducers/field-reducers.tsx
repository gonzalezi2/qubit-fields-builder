import { ADD_FIELD, DELETE_FIELD } from "../actions";

const initialState = {
  key: "",
  type: "",
  label: "",
  groupId: "",
  footnote: "",
  required: "",
  description: "",
  constraints: "",
};

const FieldReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FIELD:
      return {
        ...state,
        field: {
          // ...state.value,
        },
      };
    case DELETE_FIELD:
      return {};
    default:
      return state;
  }
};

export default FieldReducer;
