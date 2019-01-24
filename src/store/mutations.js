import * as types from "./mutation-types";

export default {
  [types.UPDATE_TABLE_DATA](state, payload) {
    state.tableData = payload;
  },

  [types.ADD_TABLE_DATA_ROW](state, payload) {
    state.tableData.push(payload);
  }
};
