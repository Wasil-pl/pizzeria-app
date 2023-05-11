export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tablesId) => tables.find((table) => table.id === tablesId);

export const moveTableByRemove = (payload) => ({ type: MOVE_TABLE_BY_REMOVE, payload });
export const moveTableToHomeByAdd = (payload) => ({ type: MOVE_TABLE_TO_HOME_BY_ADD, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });

const createActionName = (name) => `app/tables/${name}`;
const MOVE_TABLE_BY_REMOVE = createActionName('MOVE_TABLE_BY_REMOVE');
const MOVE_TABLE_TO_HOME_BY_ADD = createActionName('MOVE_TABLE_TO_HOME_BY_ADD');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
  };
};

export const updateRequest = (tableData) => {
  return (dispatch) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    };

    fetch(`http://localhost:3131/tables/${tableData.id}`, options);
    dispatch(editTable(tableData));
  };
};

export const moveTableByRemoveRequest = (tableData) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    };

    fetch(`http://localhost:3131/tables/${tableData.id}`, options).then(() =>
      dispatch(moveTableByRemove(tableData.id))
    );
  };
};

export const moveTableToHomeByAddRequest = (movedTable) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movedTable),
    };

    fetch('http://localhost:3131/tables', options).then(() => dispatch(moveTableToHomeByAdd(movedTable)));
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case MOVE_TABLE_BY_REMOVE:
      return statePart.filter((table) => table.id !== action.payload);
    case EDIT_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case MOVE_TABLE_TO_HOME_BY_ADD:
      return [...statePart, { ...action.payload }];
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
