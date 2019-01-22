<template>
  <div class="ant-table-body">
    <table class>
      <colgroup>
        <col style="width:120px;min-width:120px" />
        <col style="width:300px;min-width:300px" />
        <col />
        <col />
        <col />
      </colgroup>
      <thead class="ant-table-thead">
        <tr>
          <th class="no-border-right"><span>Coin / Token</span></th>
          <th class><span></span></th>
          <th class="fee-td-wrap"><span>Minimum Withdrawal</span></th>
          <th class="fee-td-wrap"><span>Withdrawal Fee</span></th>
          <th class="fee-td-wrap">
            <span><strong>Approx. Withdrawal Fee USDT</strong></span>
          </th>
        </tr>
      </thead>
      <tbody class="ant-table-tbody">
        <tr v-for="coin in tableData" :key="coin.symbol" class="ant-table-row ant-table-row-level-0">
          <td class="no-border-right">
            <span style="padding-left:0px" class="ant-table-row-indent indent-level-0"></span>
            <div class="sc-62mpio-0 hNXGNo">
              <img :src="coin.imgsrc" alt /> <strong>{{ coin.symbol }}</strong>
            </div>
          </td>
          <td class>{{ coin.name }}</td>
          <td class="fee-td-wrap">
            <span>{{ coin.minWithdrawal }}</span>
          </td>
          <td class="fee-td-wrap">
            <span> {{ coin.withdrawalFee }} {{ coin.symbol }} </span>
          </td>
          <td class="fee-td-wrap">
            <span>{{ coin.withdrawalFeeUsdt | money }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    tableData() {
      return this.$store.state.tableData;
    },
  },
  filters: {
    money: function(value) {
      if (isNaN(value)) return value;
      return value.toFixed(2);
    },
  },
};
</script>

<style lang="scss" scoped></style>
