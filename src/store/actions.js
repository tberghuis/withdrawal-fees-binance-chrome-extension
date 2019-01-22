import * as types from './mutation-types';

// why bother with this extra layer?
// good habbit
// plus it probably integrates well with vue devtools

export const setTableData = ({ commit }, payload) => {
  commit(types.UPDATE_TABLE_DATA, payload);
};
