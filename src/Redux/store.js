import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import initialState from './initialState';
import tablesReducer from './tablesRedux';
import storageReducer from './storageRedux';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  tables: tablesReducer,
  storage: storageReducer,
});

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);

export default store;
