import { updateStatus } from '../Redux/statusRedux';
import { storageAddTable, storageRemoveTable, updateStorage } from '../Redux/storageRedux';
import { editTable, storeAddTable, storeRemoveTable, updateTables } from '../Redux/tablesRedux';

export const fetchTables = (target, setPending) => {
  console.log('setPending:', setPending);
  return (dispatch) => {
    if (typeof setPending === 'function') {
      setPending(true);
    }
    fetch(`http://localhost:3131/api/${target}`)
      .then((res) => res.json())
      .then((data) => {
        switch (target) {
          case 'tables':
            dispatch(updateTables(data));
            break;
          case 'storage':
            dispatch(updateStorage(data));
            break;
          case 'status':
            dispatch(updateStatus(data));
            break;
          default:
            console.error(`Invalid target: ${target}`);
        }
        if (typeof setPending === 'function') {
          setPending(false);
        }
      });
  };
};

export const addTableRequest = (tableData, target) => {
  return (dispatch) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    };

    fetch(`http://localhost:3131/${target}`, options).then(() => {
      switch (target) {
        case 'tables':
          dispatch(storeAddTable(tableData));
          break;
        case 'storage':
          dispatch(storageAddTable(tableData));
          break;
        default:
          console.error(`Invalid target: ${target}`);
      }
    });
  };
};

export const removeTableRequest = (tableData, target) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tableData),
    };

    fetch(`http://localhost:3131/${target}/${tableData.id}`, options).then(() => {
      switch (target) {
        case 'tables':
          dispatch(storeRemoveTable(tableData));
          break;
        case 'storage':
          dispatch(storageRemoveTable(tableData));
          break;
        default:
          console.error(`Invalid target: ${target}`);
      }
    });
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
