import Vue from 'vue';
import WithdrawalFeeTable from './WithdrawalFeeTable';
import store from '../store';
import { coinsBtcPairings, coinsUsdtPairings } from './pairings';
const axios = require('axios');
const $ = require('jquery');

let symbol = $('td:first-child strong', 'table:eq(1)')
  .map(function() {
    return this.innerHTML;
  })
  .get();

// probably better way to get this
let imgsrc = $('img', 'table:eq(1)')
  .map(function() {
    return this.src;
  })
  .get();

let name = $('td:nth-child(2)', 'table:eq(1)')
  .map(function() {
    return this.innerHTML;
  })
  .get();

let minWithdrawal = $('td:nth-child(3) span', 'table:eq(1)')
  .map(function() {
    return this.innerHTML;
  })
  .get();

let withdrawalFee = $('td:nth-child(4) span', 'table:eq(1)')
  .map(function() {
    return this.innerHTML;
  })
  .get();
withdrawalFee = withdrawalFee.map(data => {
  return data.split('<!-- --> <!-- -->')[0];
});

let cacheBtcUsdtPrice;
async function fetchBtcUsdtPrice() {
  let response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT');
  cacheBtcUsdtPrice = response.data.price;
  return cacheBtcUsdtPrice;
}

async function calculateUsdtFee(sym, fee) {
  let response;
  if (coinsUsdtPairings[sym]) {
    response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinsUsdtPairings[sym]}`);
    return fee * response.data.price;
  } else if (coinsBtcPairings[sym]) {
    response = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${coinsBtcPairings[sym]}`);

    // for some reason cache not working... could just rely on chrome cache
    let btcUsdtPrice = cacheBtcUsdtPrice ? cacheBtcUsdtPrice : await fetchBtcUsdtPrice();

    // let btcUsdtPrice;
    // if (cacheBtcUsdtPrice)
    //   btcUsdtPrice = cacheBtcUsdtPrice;
    // else
    //   btcUsdtPrice = await fetchBtcUsdtPrice();

    return fee * response.data.price * btcUsdtPrice;
  } else {
    return 'N/A';
  }
}

let tableDataPromises = symbol.map(async (sym, index) => {
  let withdrawalFeeUsdt;
  try {
    withdrawalFeeUsdt = await calculateUsdtFee(sym, withdrawalFee[index]);
  } catch (error) {
    withdrawalFeeUsdt = 'ERROR';
  }
  return {
    symbol: sym,
    imgsrc: imgsrc[index],
    name: name[index],
    minWithdrawal: minWithdrawal[index],
    withdrawalFee: withdrawalFee[index],
    withdrawalFeeUsdt,
  };
});

// insert div to hold Vue component
$('.ant-table-body:eq(1)').after($('<div id="withdrawal-fee-table-container" class="ant-table-body"></div>'));

// for some reason i can't do this yet
// $('.ant-table-body:eq(1)').hide();

/* eslint-disable no-new */
let vue = new Vue({
  el: '#withdrawal-fee-table-container',
  store,
  render: h => h(WithdrawalFeeTable),
});

Promise.all(tableDataPromises).then(tableData => {
  // run action setTableData
  vue.$store.dispatch('setTableData', tableData);
  // hide original table
  $('.ant-table-body:eq(1)').hide();
});
