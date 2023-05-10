export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tablesId) => tables.find((table) => table.id === tablesId);

export const removeTable = (payload) => ({ type: REMOVE_TABLE, payload });
export const addTables = (payload) => ({ type: ADD_TABLES, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });

const createActionName = (name) => `app/tables/${name}`;
const REMOVE_TABLE = createActionName('REMOVE_TABLE');
const ADD_TABLES = createActionName('ADD_TABLES');
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

export const removeTableRequest = (tableData) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    };

    fetch(`http://localhost:3131/tables/${tableData.id}`, options).then(() => dispatch(removeTable(tableData.id)));
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    case EDIT_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case ADD_TABLES:
      return [...statePart, { ...action.payload }];
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
