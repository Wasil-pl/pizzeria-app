import { httpClient } from '../api/httpClient';
import { LIST_NAMES } from '../consts';
import shortid from 'shortid';

export const getAllTables = (state) => state.tables.list;
export const getActiveTables = (state) => state.tables.list.filter((table) => table.listId === LIST_NAMES.main);
export const getStorageTables = (state) => state.tables.list.filter((table) => table.listId === LIST_NAMES.storage);
export const getTableById = ({ tables }, tablesId) => tables.list.find((table) => table.id === tablesId);
export const selectAreTablesLoading = ({ tables }) => tables.loading;
export const selectTablesError = ({ tables }) => tables.error;

export const storeRemoveTable = (payload) => ({ type: STORE_REMOVE_TABLE, payload });
export const storeAddTable = (payload) => ({ type: STORE_ADD_TABLE, payload });
export const updateTables = (payload) => ({ type: SET_TABLES, payload });
export const editTable = (payload) => ({ type: EDIT_TABLE, payload });
export const changeList = (payload) => ({ type: CHANGE_LIST, payload });

export const fetchTablesStart = () => ({ type: FETCH_TABLES_START });
export const fetchTablesSuccess = (payload) => ({ type: FETCH_TABLES_SUCCESS, payload });
export const fetchTablesFail = (payload) => ({ type: FETCH_TABLES_FAIL, payload });

const createActionName = (name) => `app/tables/${name}`;
const STORE_REMOVE_TABLE = createActionName('STORE_REMOVE_TABLE');
const STORE_ADD_TABLE = createActionName('STORE_ADD_TABLE');
const SET_TABLES = createActionName('SET_TABLES');
const EDIT_TABLE = createActionName('EDIT_TABLE');
const CHANGE_LIST = createActionName('CHANGE_LIST'); // payload: {id, listName: LIST_NAMES.main || LIST_NAMES.storage}

const FETCH_TABLES_START = createActionName('FETCH_TABLES_START');
const FETCH_TABLES_SUCCESS = createActionName('FETCH_TABLES_SUCCESS');
const FETCH_TABLES_FAIL = createActionName('FETCH_TABLES_FAIL');

const reducer = (statePart = { list: [], error: null, loading: false }, action) => {
  switch (action.type) {
    case FETCH_TABLES_START:
      return { ...statePart, loading: true, error: null };
    case FETCH_TABLES_FAIL:
      return { ...statePart, loading: false, error: action.payload };
    case FETCH_TABLES_SUCCESS:
      return { ...statePart, loading: false, error: null, list: [...action.payload] };

    case CHANGE_LIST:
      return {
        ...statePart,
        list: statePart.list.map((table) =>
          table.id === action.payload.id ? { ...table, listId: action.payload.listId } : table
        ),
      };
    case STORE_REMOVE_TABLE:
      return { ...statePart, list: statePart.list.filter((table) => table.id !== action.payload) };
    case EDIT_TABLE:
      return {
        ...statePart,
        list: statePart.list.map((table) => (table.id === action.payload.id ? { ...table, ...action.payload } : table)),
      };
    case STORE_ADD_TABLE:
      return {
        ...statePart,
        list: [...statePart.list, { ...action.payload, id: shortid() }],
      };
    case SET_TABLES:
      return { ...statePart, list: [...action.payload] };
    default:
      return statePart;
  }
};

export default reducer;

export const fetchTables = () => {
  return (dispatch) => {
    dispatch(fetchTablesStart());

    httpClient
      .get('http://localhost:3131/api/tables')
      .then((res) => res.json())
      .then((data) => dispatch(fetchTablesSuccess(data)))
      .catch((error) => dispatch(fetchTablesFail('Error fetching tables')));
  };
};

export const moveRequest = (tableId, target) => {
  return (dispatch) => {
    httpClient.patch(`http://localhost:3131/api/tables/${tableId}`, { listId: target }).then(() => {
      dispatch(storeAddTable(tableId));
    });
  };
};

export const addTableRequest = (tableData) => {
  return (dispatch) => {
    httpClient.post('http://localhost:3131/api/tables', tableData).then(() => {
      dispatch(storeAddTable(tableData));
    });
  };
};

export const removeTableRequest = (tableId) => {
  return (dispatch) => {
    httpClient.delete(`http://localhost:3131/api/tables/${tableId}`).then(() => {
      dispatch(storeRemoveTable(tableId));
    });
  };
};

export const updateRequest = (tableData) => {
  return (dispatch) => {
    httpClient.patch(`http://localhost:3131/api/tables/${tableData.id}`, tableData).then(() => {
      dispatch(editTable(tableData));
    });
  };
};
