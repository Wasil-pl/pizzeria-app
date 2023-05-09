export const getAllTables = (state) => state.storage;

export const removeTables = (payload) => ({ type: REMOVE_TABLES, payload });
export const addTables = (payload) => ({ type: ADD_TABLES, payload });
export const updateStorage = (payload) => ({ type: UPDATE_STORAGE, payload });

const createActionName = (name) => `app/tables/${name}`;
const REMOVE_TABLES = createActionName('REMOVE_TABLES');
const ADD_TABLES = createActionName('ADD_TABLES');
const UPDATE_STORAGE = createActionName('UPDATE_STORAGE');

export const fetchStorage = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/storage')
      .then((res) => res.json())
      .then((storage) => dispatch(updateStorage(storage)));
  };
};

export const updateRequest = (newTable) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTable),
    };

    fetch('http://localhost:3131/storage', options).then(() => dispatch(addTables(newTable)));
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case REMOVE_TABLES:
      return statePart.filter((table) => table.id !== action.payload);
    case ADD_TABLES:
      return [...statePart, { ...action.payload }];
    case UPDATE_STORAGE:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
