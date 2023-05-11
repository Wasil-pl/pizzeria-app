export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tablesId) => tables.find((table) => table.id === tablesId);

export const storeRemoveTable = (payload) => ({ type: STORE_REMOVE_TABLE, payload });
export const storeAddTable = (payload) => ({ type: STORE_ADD_TABLE, payload });
export const updateTables = (payload) => ({ type: UPDATE_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });

const createActionName = (name) => `app/tables/${name}`;
const STORE_REMOVE_TABLE = createActionName('STORE_REMOVE_TABLE');
const STORE_ADD_TABLE = createActionName('STORE_ADD_TABLE');
const UPDATE_TABLES = createActionName('UPDATE_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case STORE_REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    case EDIT_TABLE:
      return statePart.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table));
    case STORE_ADD_TABLE:
      return [...statePart, { ...action.payload }];
    case UPDATE_TABLES:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
