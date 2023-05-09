export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tablesId) => tables.find((table) => table.id === tablesId);

export const removeTables = (payload) => ({ type: REMOVE_TABLES, payload });
export const addTables = (payload) => ({ type: ADD_TABLES, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });

const createActionName = (name) => `app/tables/${name}`;
const REMOVE_TABLES = createActionName('REMOVE_TABLES');
const ADD_TABLES = createActionName('ADD_TABLES');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');

export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((tables) => dispatch(updateTables(tables)));
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

    fetch('http://localhost:3131/tables', options).then(() => dispatch(addTables(newTable)));
  };
};

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case REMOVE_TABLES:
      return statePart.filter((table) => table.id !== action.payload);
    case ADD_TABLES:
      return [...statePart, { ...action.payload }];
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
