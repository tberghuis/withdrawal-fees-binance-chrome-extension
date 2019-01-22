import * as types from './mutation-types';

export default {
  [types.UPDATE_TABLE_DATA](state, payload) {
    state.tableData = payload;
  },
};
