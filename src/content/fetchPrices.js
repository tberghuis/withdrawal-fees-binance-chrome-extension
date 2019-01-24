const axios = require("axios");

const usdtPricePairings = [
  "BTC",
  "ETH",
  "EOS",
  "TRX",
  "XRP",
  "BNB",
  "LTC",
  "PAX",
  "ADA",
  "NEO",
  "BCHABC",
  "XLM",
  "TUSD",
  "ETC",
  "BCHSV",
  "ONT",
  "VET",
  "USDC",
  "ICX",
  "IOTA",
  "QTUM"
];

const btcPricePairings = [
  "LINK",
  "OAX",
  "CMT",
  "DLT",
  "LUN",
  "BQX",
  "REP",
  "WAVES",
  "EVX",
  "ARN",
  "TNT",
  "XMR",
  "NANO",
  "QKC",
  "WINGS",
  "HOT",
  "LRC",
  "RCN",
  "BCPT",
  "NPXS",
  "WAN",
  "ZIL",
  "AST",
  "STEEM",
  "MITH",
  "NAV",
  "QSP",
  "PHX",
  "MOD",
  "HC",
  "FUN",
  "MTL",
  "VIBE",
  "MTH",
  "DASH",
  "XEM",
  "DOCK",
  "INS",
  "GXS",
  "OST",
  "RVN",
  "MFT",
  "POA",
  "DGD",
  "ZRX",
  "EDO",
  "VIB",
  "ZEC",
  "BAT",
  "THETA",
  "OMG",
  "NXS",
  "GTO",
  "ELF",
  "WTC",
  "IOTX",
  "AMB",
  "STRAT",
  "POLY",
  "IOST",
  "SKY",
  "QLC",
  "DNT",
  "XVG",
  "GO",
  "ADX",
  "POWR",
  "AION",
  "XZC",
  "LSK",
  "AE",
  "BCD",
  "SC",
  "KEY",
  "PPT",
  "SYS",
  "APPC",
  "MANA",
  "BLZ",
  "WABI",
  "ZEN",
  "REN",
  "ENJ",
  "MDA",
  "POE",
  "SNT",
  "DENT",
  "REQ",
  "NAS",
  "SNM",
  "YOYO",
  "LOOM",
  "GVT",
  "DATA",
  "PIVX",
  "NCASH",
  "SALT",
  "FUEL",
  "BRD",
  "KNC",
  "RLC",
  "BTG",
  "KMD",
  "STORM",
  "ENG",
  "TNB",
  "DCR",
  "GNT",
  "CLOAK",
  "WPR",
  "CVC",
  "AGI",
  "SUB",
  "STORJ",
  "NULS",
  "RDN",
  "MCO",
  "CND",
  "ARK",
  "CDT",
  "VIA",
  "LEND",
  "BTS",
  "ARDR",
  "GAS",
  "NEBL",
  "SNGLS",
  "BNT",
  "GRS"
];

const allPricesPromise = async () => {
  const allPrices = {};
  const btcPrices = {};

  const fetchUsdtPriceForSym = async sym => {
    const res = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${sym}USDT`
    );
    allPrices[sym] = Number(res.data.price);
  };
  const fetchBtcPriceForSym = async sym => {
    const res = await axios.get(
      `https://api.binance.com/api/v3/ticker/price?symbol=${sym}BTC`
    );
    btcPrices[sym] = Number(res.data.price);
  };

  await Promise.all([
    ...usdtPricePairings.map(sym => fetchUsdtPriceForSym(sym)),
    ...btcPricePairings.map(sym => fetchBtcPriceForSym(sym))
  ]);

  for (const sym of Object.keys(btcPrices)) {
    allPrices[sym] = btcPrices[sym] * allPrices.BTC;
  }

  console.log(allPrices);
  return allPrices;
};

// allPricesPromise().catch(function(error) {
//   console.log("Error " + error.message);
// });

export default allPricesPromise();
