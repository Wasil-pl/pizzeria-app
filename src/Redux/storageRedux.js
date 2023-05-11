export const getAllTables = (state) => state.storage;

export const moveTableToHomeByRemove = (payload) => ({ type: MOVE_TABLE_TO_HOME_BY_REMOVE, payload });
export const moveTableByAdd = (payload) => ({ type: MOVE_TABLE_BY_ADD, payload });
export const updateStorage = (payload) => ({ type: UPDATE_STORAGE, payload });

const createActionName = (name) => `app/tables/${name}`;
const MOVE_TABLE_TO_HOME_BY_REMOVE = createActionName('MOVE_TABLE_TO_HOME_BY_REMOVE');
const MOVE_TABLE_BY_ADD = createActionName('MOVE_TABLE_BY_ADD');
const UPDATE_STORAGE = createActionName('UPDATE_STORAGE');

export const fetchStorage = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/storage')
      .then((res) => res.json())
      .then((storage) => dispatch(updateStorage(storage)));
  };
};

export const moveTableByAddRequest = (movedTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movedTable),
    };

    fetch('http://localhost:3131/storage', options).then(() => dispatch(moveTableByAdd(movedTable)));
  };
};

export const moveTableToHomeByRemoveRequest = (tableData) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    };

    fetch(`http://localhost:3131/storage/${tableData.id}`, options).then(() =>
      dispatch(moveTableToHomeByRemove(tableData.id))
    );
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case MOVE_TABLE_TO_HOME_BY_REMOVE:
      return statePart.filter((table) => table.id !== action.payload);
    case MOVE_TABLE_BY_ADD:
      return [...statePart, { ...action.payload }];
    case UPDATE_STORAGE:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
