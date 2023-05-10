export const getAllTables = (state) => state.storage;

export const deleteTables = (payload) => ({ type: DELETE_TABLES, payload });
export const moveTableToStorage = (payload) => ({ type: MOVE_TABLE_TO_STORAGE, payload });
export const updateStorage = (payload) => ({ type: UPDATE_STORAGE, payload });

const createActionName = (name) => `app/tables/${name}`;
const DELETE_TABLES = createActionName('DELETE_TABLES');
const MOVE_TABLE_TO_STORAGE = createActionName('MOVE_TABLE_TO_STORAGE');
const UPDATE_STORAGE = createActionName('UPDATE_STORAGE');

export const fetchStorage = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/storage')
      .then((res) => res.json())
      .then((storage) => dispatch(updateStorage(storage)));
  };
};

export const moveTableRequest = (movedTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movedTable),
    };

    fetch('http://localhost:3131/storage', options).then(() => dispatch(moveTableToStorage(movedTable)));
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case DELETE_TABLES:
      return statePart.filter((table) => table.id !== action.payload);
    case MOVE_TABLE_TO_STORAGE:
      return [...statePart, { ...action.payload }];
    case UPDATE_STORAGE:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
