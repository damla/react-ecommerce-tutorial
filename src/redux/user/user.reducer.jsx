const INITIAL_STATE = {
  currentUser: null,
};

// by using default parameter, if the state is undefined
// it will get that value
const userReducer = (state = INITIAL_STATE, action) => {
  // string value
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
