import * as types from './mutation-types';

// why bother with this extra layer?
// good habbit
// plus it probably integrates well with vue devtools

// export const setTableData = ({ commit }, payload) => {
//   commit(types.UPDATE_TABLE_DATA, payload);
// };


export const addTableDataRow = ({ commit }, payload) => {
  commit(types.ADD_TABLE_DATA_ROW, payload);
};

