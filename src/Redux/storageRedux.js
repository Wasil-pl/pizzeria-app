export const getAllTables = (state) => state.storage;

export const storageRemoveTable = (payload) => ({ type: STORAGE_REMOVE_TABLE, payload });
export const storageAddTable = (payload) => ({ type: STORAGE_ADD_TABLE, payload });
export const updateStorage = (payload) => ({ type: UPDATE_STORAGE, payload });

const createActionName = (name) => `app/tables/${name}`;
const STORAGE_REMOVE_TABLE = createActionName('STORAGE_REMOVE_TABLE');
const STORAGE_ADD_TABLE = createActionName('STORAGE_ADD_TABLE');
const UPDATE_STORAGE = createActionName('UPDATE_STORAGE');

const reducer = (statePart = [], action) => {
  switch (action.type) {
    case STORAGE_REMOVE_TABLE:
      return statePart.filter((table) => table.id !== action.payload);
    case STORAGE_ADD_TABLE:
      return [...statePart, { ...action.payload }];
    case UPDATE_STORAGE:
      return [...action.payload];
    default:
      return statePart;
  }
};

export default reducer;
