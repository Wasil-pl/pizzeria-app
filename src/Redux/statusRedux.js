export const getAllStatus = (state) => state.status;

export const updateStatus = (payload) => ({ type: UPDATE_STATUS, payload });

const createActionName = (name) => `app/tables/${name}`;
const UPDATE_STATUS = createActionName('UPDATE_STATUS');

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
