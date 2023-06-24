const table = document.getElementById("table");
const searchBar = document.getElementById("search-bar");
const marketCapBtn = document.getElementById("market-cap");
const percentageBtn = document.getElementById("percentage");
let apiData = [];
let mktBtn = true;
let percentBtn = true;

const data = fetch(
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
);

// Extraction and inclusion of the required properties from Api

data
  .then((res) => {
    return res.json();
  })
  .then((response) => {
    let tableData = "";
    dataHandler(response);
    response.map((val) => {
      return (tableData += `<tr style="border-bottom:1px solid white">
        <td><img src="${val.image}" /></td>
        <td>${val.name}</td>
        <td>${val.symbol}</td>
        <td>\$${val.current_price}</td>
        <td>\$${val.total_volume}</td>
        <td>${val.price_change_percentage_24h}%</td>
        <td>Mkt cap: \$${val.market_cap}</td>
    </tr>`);
    });
    table.innerHTML = tableData;
  });

const dataHandler = (data) => {
  apiData = data;
};

//handling user search

const searchBtnHanlder = (ev) => {
  table.innerHTML = "";
  let tableData = "";
  apiData.forEach((val) => {
    const lower = val["name"].toLowerCase();
    if (
      val["name"].includes(ev.target.value) ||
      lower.includes(ev.target.value) ||
      val["symbol"].includes(ev.target.value)
    ) {
      return (tableData += `<tr style="border-bottom:1px solid white">
      <td><img src="${val.image}" /></td>
      <td>${val.name}</td>
      <td>${val.symbol}</td>
      <td>\$${val.current_price}</td>
      <td>\$${val.total_volume}</td>
      <td>${val.price_change_percentage_24h}%</td>
      <td>Mkt cap: \$${val.market_cap}</td>
  </tr>`);
    }
  });
  table.innerHTML = tableData;
};

searchBar.addEventListener("keyup", searchBtnHanlder);

const reRenderTable = () => {
  let tableData = "";
  table.innerHTML = "";
  apiData.map((val) => {
    return (tableData += `<tr style="border-bottom:1px solid white">
            <td><img src="${val.image}" /></td>
            <td>${val.name}</td>
            <td>${val.symbol}</td>
            <td>\$${val.current_price}</td>
            <td>\$${val.total_volume}</td>
            <td>${val.price_change_percentage_24h}%</td>
            <td>Mkt cap: \$${val.market_cap}</td>
        </tr>`);
  });
  table.innerHTML = tableData;
};

//   sorting by mkt Cap button

const marketCapBtnHandler = () => {
  if (mktBtn === true) {
    let newApiData = [...apiData];
    let sortedData = newApiData.sort((d1, d2) =>
      d1["market_cap"] < d2["market_cap"]
        ? -1
        : d1["market_cap"] > d2["market_cap"]
        ? 1
        : 0
    );
    table.innerHTML = "";
    let tableData = "";
    sortedData.forEach((val) => {
      return (tableData += `<tr style="border-bottom:1px solid white">
        <td><img src="${val.image}" /></td>
        <td>${val.name}</td>
        <td>${val.symbol}</td>
        <td>\$${val.current_price}</td>
        <td>\$${val.total_volume}</td>
        <td>${val.price_change_percentage_24h}%</td>
        <td>Mkt cap: \$${val.market_cap}</td>
    </tr>`);
    });
    table.innerHTML = tableData;
    mktBtn = false;
    console.log(mktBtn);
  } else {
    reRenderTable();
    mktBtn = true;
  }
};

marketCapBtn.addEventListener("click", marketCapBtnHandler);

//   sorting by Percentage button

const percentageBtnHandler = () => {
  if (percentBtn === true) {
    let newApiData = [...apiData];
    let sortedData = newApiData.sort((d1, d2) =>
      d1["price_change_percentage_24h"] < d2["price_change_percentage_24h"]
        ? -1
        : d1["price_change_percentage_24h"] > d2["price_change_percentage_24h"]
        ? 1
        : 0
    );
    table.innerHTML = "";
    let tableData = "";
    sortedData.forEach((val) => {
      return (tableData += `<tr style="border-bottom:1px solid white">
        <td><img src="${val.image}" /></td>
        <td>${val.name}</td>
        <td>${val.symbol}</td>
        <td>\$${val.current_price}</td>
        <td>\$${val.total_volume}</td>
        <td>${val.price_change_percentage_24h}%</td>
        <td>Mkt cap: \$${val.market_cap}</td>
    </tr>`);
    });
    table.innerHTML = tableData;
    percentBtn = false;
    console.log(mktBtn);
  } else {
    reRenderTable();
    percentBtn = true;
  }
};

percentageBtn.addEventListener("click", percentageBtnHandler);
