import Vue from "vue";
import WithdrawalFeeTable from "./WithdrawalFeeTable";
import store from "../store";
import pricesPromise from "./fetchPrices";
const $ = require("jquery");

$(function() {
  // so nextjs was breaking my script
  $("#__next").removeAttr("id");
  $('.ant-table-body:eq(1)').hide();

  let symbol = $("td:first-child strong", "table:eq(1)")
    .map(function() {
      return this.innerHTML;
    })
    .get();

  // probably better way to get this
  let imgsrc = $("img", "table:eq(1)")
    .map(function() {
      return this.src;
    })
    .get();

  let name = $("td:nth-child(2)", "table:eq(1)")
    .map(function() {
      return this.innerHTML;
    })
    .get();

  let minWithdrawal = $("td:nth-child(3) span", "table:eq(1)")
    .map(function() {
      return this.innerHTML;
    })
    .get();

  let withdrawalFee = $("td:nth-child(4) span", "table:eq(1)")
    .map(function() {
      return this.innerHTML;
    })
    .get();
  withdrawalFee = withdrawalFee.map(data => {
    return data.split("<!-- --> <!-- -->")[0];
  });

  // insert div to hold Vue component
  $(".ant-table-body:eq(1)").after(
    $('<div id="withdrawal-fee-table-container" class="ant-table-body"></div>')
  );
  
  /* eslint-disable no-new */
  let vue = new Vue({
    el: "#withdrawal-fee-table-container",
    store,
    render: h => h(WithdrawalFeeTable)
  });

  pricesPromise.then(prices => {
    for (var i = 0; i < symbol.length; i++) {
      let tableDataRow = {
        symbol: symbol[i],
        imgsrc: imgsrc[i],
        name: name[i],
        minWithdrawal: minWithdrawal[i],
        withdrawalFee: withdrawalFee[i],
        withdrawalFeeUsdt: prices[symbol[i]]
          ? withdrawalFee[i] * prices[symbol[i]]
          : "N/A"
      };
      vue.$store.dispatch("addTableDataRow", tableDataRow);
    }
  });
});
